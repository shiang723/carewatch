package com.carewatch.controller;

import com.carewatch.model.patient.Patient;
import com.carewatch.model.patient.VitalReading;
import com.carewatch.service.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> getPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<Patient> getPatient(@PathVariable("patientId") String patientId) {
        return patientService.getPatient(patientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{patientId}/vitals")
    public ResponseEntity<VitalReading> getCurrentVitals(@PathVariable("patientId") String patientId) {
        return patientService.getCurrentVitals(patientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{patientId}/history")
    public ResponseEntity<List<VitalReading>> getHistory(@PathVariable("patientId") String patientId) {
        return patientService.getHistory(patientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}