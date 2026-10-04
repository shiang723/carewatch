package com.carewatch.controller;

import com.carewatch.model.alert.PatientStatus;
import com.carewatch.model.patient.VitalReading;
import com.carewatch.service.AlertService;
import com.carewatch.service.PatientService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    private final AlertService alertService;
    private final PatientService patientService;

    public AlertController(AlertService alertService, PatientService patientService) {
        this.alertService = alertService;
        this.patientService = patientService;
    }

    /**
     * Endpoint: GET /api/alerts/patient/{patientId}/status
     * Returns the live evaluated priority state of a single patient
     */
    @GetMapping("/patient/{patientId}/status")
    public ResponseEntity<PatientStatus> getPatientStatus(@PathVariable String patientId) {

        Optional<VitalReading> latestVitals = patientService.getCurrentVitals(patientId);
        PatientStatus currentStatus = alertService.determinePatientStatus(patientId, latestVitals);
        return ResponseEntity.ok(currentStatus);
    }
}
