package com.carewatch.repository;

import com.carewatch.model.patient.Patient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.json.JsonMapper;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Repository
public class PatientRepository {

    private final List<Patient> patients;

    public PatientRepository(JsonMapper jsonMapper) {
        this.patients = loadPatients(jsonMapper);
    }

    private List<Patient> loadPatients(JsonMapper jsonMapper) {
        try (InputStream in = new ClassPathResource("json/patients.json").getInputStream()) {
            return List.of(jsonMapper.readValue(in, Patient[].class));
        } catch (Exception e) {
            throw new IllegalStateException("Could not load json/patients.json", e);
        }
    }

    public List<Patient> findAll() {
        return patients;
    }

    public Optional<Patient> findById(String patientId) {
        return patients.stream()
                .filter(p -> p.getPatientId().equals(patientId))
                .findFirst();
    }
}