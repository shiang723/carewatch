package com.carewatch.model.patient;

import java.util.List;

public class Patient {

    private String patientId;
    private String name;
    private VitalReading currentVitals;
    private List<VitalReading> history;

    public Patient(String patientId,
            String name,
            VitalReading currentVitals,
            List<VitalReading> history)
    {
        this.patientId = patientId;
        this.name = name;
        this.currentVitals = currentVitals;
        this.history = history;
    }

    public String getPatientId() { return patientId; }
    public String getName() { return name; }
    public VitalReading getCurrentVitals() { return currentVitals; }
    public List<VitalReading> getHistory() { return history; }
}