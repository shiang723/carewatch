package com.carewatch.model.patient;

public class VitalReading {

    private int heartRate;
    private int spo2;
    private double temperature;

    public VitalReading(int heartRate, int spo2, double temperature) {
        this.heartRate = heartRate;
        this.spo2 = spo2;
        this.temperature = temperature;
    }

    public int getHeartRate() { return heartRate; }
    public int getSpo2() { return spo2; }
    public double getTemperature() { return temperature; }
}