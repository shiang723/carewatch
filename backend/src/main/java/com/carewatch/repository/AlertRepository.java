package com.carewatch.repository;

import com.carewatch.model.alert.Alert;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.json.JsonMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AlertRepository {

    private final JsonMapper jsonMapper;
    private final Path alertFile;
    private final List<Alert> alerts;

    public AlertRepository(
            JsonMapper jsonMapper,
            @Value("${carewatch.alerts.file:data/alerts.json}") String alertFile) {
        this.jsonMapper = jsonMapper;
        this.alertFile = Path.of(alertFile);
        this.alerts = loadAlerts();
    }

    public synchronized List<Alert> findAll() {
        return List.copyOf(alerts);
    }

    public synchronized Optional<Alert> findLatestByPatientId(String patientId) {
        return alerts.stream()
                .filter(alert -> alert.getPatientID().equals(patientId))
                .reduce((first, second) -> second);
    }

    public synchronized Alert save(String patientId, String severity, String description) {
        long nextId = alerts.stream()
                .map(Alert::getId)
                .filter(id -> id != null)
                .max(Long::compareTo)
                .orElse(0L) + 1;

        Alert alert = new Alert(
                patientId,
                nextId,
                LocalDateTime.now(),
                severity,
                description,
                false);
        alerts.add(alert);
        persist();
        return alert;
    }

    public synchronized Optional<Alert> acknowledge(Long id) {
        Optional<Alert> alert = alerts.stream()
                .filter(candidate -> candidate.getId().equals(id))
                .findFirst();
        alert.ifPresent(candidate -> {
            candidate.setAcknowledged(true);
            persist();
        });
        return alert;
    }

    private List<Alert> loadAlerts() {
        if (!Files.exists(alertFile)) {
            return new ArrayList<>();
        }

        try {
            Alert[] storedAlerts;
            try (var reader = Files.newBufferedReader(alertFile)) {
                storedAlerts = jsonMapper.readValue(reader, Alert[].class);
            }
            return new ArrayList<>(List.of(storedAlerts));
        } catch (IOException e) {
            throw new IllegalStateException("Could not load " + alertFile, e);
        }
    }

    private void persist() {
        try {
            Path parent = alertFile.getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            try (var writer = Files.newBufferedWriter(alertFile)) {
                jsonMapper.writeValue(writer, alerts);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Could not write " + alertFile, e);
        }
    }
}
