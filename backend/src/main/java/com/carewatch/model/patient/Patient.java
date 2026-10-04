package com.carewatch.model.patient;

import java.util.List;

public class Patient {

    private String patientId;
    private String name;
    private VitalReading currentVitals;
    private List<VitalReading> history;

    public Patient() {
    }

    public Patient(String patientId, String name, VitalReading currentVitals, List<VitalReading> history) {
        this.patientId = patientId;
        this.name = name;
        this.currentVitals = currentVitals;
        this.history = history;
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public VitalReading getCurrentVitals() { return currentVitals; }
    public void setCurrentVitals(VitalReading currentVitals) { this.currentVitals = currentVitals; }
    public List<VitalReading> getHistory() { return history; }
    public void setHistory(List<VitalReading> history) { this.history = history; }
}