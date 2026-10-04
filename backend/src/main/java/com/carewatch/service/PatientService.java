package com.carewatch.service;

import com.carewatch.model.patient.Patient;
import com.carewatch.model.patient.VitalReading;
import com.carewatch.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatient(String patientId) {
        return patientRepository.findById(patientId);
    }

    public Optional<VitalReading> getCurrentVitals(String patientId) {
        return patientRepository.findById(patientId).map(Patient::getCurrentVitals);
    }

    public Optional<List<VitalReading>> getHistory(String patientId) {
        return patientRepository.findById(patientId).map(Patient::getHistory);
    }
}