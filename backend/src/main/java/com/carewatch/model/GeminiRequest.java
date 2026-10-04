package com.carewatch.model;

import java.util.List;

public class GeminiRequest {
    private final String patientID;
    private final int heartRate;
    private final int spO2;
    private final double temperature;
    private final String priority;
    private final List<String> alertReasons;

    public GeminiRequest(final String patientID,
                         final int heartRate,
                         final int spO2,
                         final double temperature,
                         final String priority,
                         final List<String> alertReasons) {

        this.patientID = patientID;
        this.heartRate = heartRate;
        this.spO2 = spO2;
        this.temperature = temperature;
        this.priority = priority;
        this.alertReasons = alertReasons;
    }

    public String getPatientID() {
        return patientID;
    }

    public int getHeartRate() {
        return heartRate;
    }

    public int getSpO2() {
        return spO2;
    }

    public double getTemperature() {
        return temperature;
    }

    public String getPriority() {
        return priority;
    }

    public List<String> getAlertReasons() {
        return alertReasons;
    }
}
