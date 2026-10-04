package com.carewatch.service;

import com.carewatch.model.alert.PatientStatus;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.carewatch.model.patient.VitalReading;
import org.springframework.stereotype.Service;

@Service
public class AlertService
{
    private static final int MIN_HEART_RATE_STABLE = 60;
    private static final int MAX_HEART_RATE_STABLE = 100;
    private static final int MIN_HEART_RATE_MONITOR_BELOW = 41;
    private static final int HEART_RATE_HIGH_THRESHOLD = 120;
    private static final int MIN_HEART_RATE_HIGH_BELOW = 0;
    private static final int MAX_HEART_RATE_HIGH_BELOW = 40;

    private static final int SPO2_STABLE_THRESHOLD = 95;
    private static final int SPO2_MONITOR_MIN_THRESHOLD = 90;

    private static final double TEMPERATURE_STABLE_MIN = 36.0;
    private static final double TEMPERATURE_STABLE_MAX = 37.5;
    private static final double TEMPERATURE_HIGH_THRESHOLD = 38.0;
    private static final double TEMPERATURE_HIGH_LOW_THRESHOLD = 35.0;


    public PatientStatus determinePatientStatus(String patientId,
                                                Optional<VitalReading> latestVitals)
    {
        if (latestVitals.isEmpty())
        {
            return new PatientStatus(patientId, 0, 0, 0, "STABLE", List.of("No readings available"));
        }

        var vitals = latestVitals.get();
        int heartRate = vitals.getHeartRate();
        int spO2 = vitals.getSpo2();
        double temperature = vitals.getTemperature();

        List<String> reasons = new ArrayList<>();
        String priority = "STABLE";

        if (heartRate >= MIN_HEART_RATE_STABLE && heartRate <= MAX_HEART_RATE_STABLE)
        {
            reasons.add("Heart rate is stable.");
        }
        else if (heartRate > HEART_RATE_HIGH_THRESHOLD ||
                (heartRate >= MIN_HEART_RATE_HIGH_BELOW && heartRate <= MAX_HEART_RATE_HIGH_BELOW))
        {
            priority = "HIGH";
            reasons.add(heartRate > HEART_RATE_HIGH_THRESHOLD ? "Heart rate is too high." : "Heart rate is too low.");
        }
        else if (heartRate > MAX_HEART_RATE_STABLE && heartRate <= HEART_RATE_HIGH_THRESHOLD) {
            priority = "MONITOR";
            reasons.add("Higher heart rate than normal.");
        }
        else if (heartRate < MIN_HEART_RATE_STABLE && heartRate >= MIN_HEART_RATE_MONITOR_BELOW) {
            priority = "MONITOR";
            reasons.add("Lower heart rate than normal.");
        }


        if (spO2 >= SPO2_STABLE_THRESHOLD){
            reasons.add("Normal oxygen saturation.");
        }
        else if (spO2 >= SPO2_MONITOR_MIN_THRESHOLD){
            priority = !priority.equals("HIGH") ?"MONITOR": "HIGH";
            reasons.add("Lower oxygen saturation than normal.");
        } else {
            priority = "HIGH";
            reasons.add("Oxygen saturation is critically low.");
        }

        if (temperature >= TEMPERATURE_STABLE_MIN && temperature <= TEMPERATURE_STABLE_MAX){
            reasons.add("Temperature is normal.");
        }
        else if (temperature >= TEMPERATURE_HIGH_THRESHOLD|| temperature < TEMPERATURE_HIGH_LOW_THRESHOLD){
            priority = "HIGH";
            reasons.add( temperature < TEMPERATURE_HIGH_LOW_THRESHOLD? "Temperature is too low.": "Temperature is too high.");
        } else{
            priority = !priority.equals("HIGH") ?"MONITOR": "HIGH";
            reasons.add(temperature < TEMPERATURE_STABLE_MIN? "Temperature is lower than normal." : "Temperature is higher than normal.");
        }


        return new PatientStatus(patientId, heartRate, spO2, temperature, priority, reasons);
    }
}