package com.carewatch.model.alert;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PatientStatus
{
    private final String patientId;
    private int currentHeartRate;
    private int currentSpO2;
    private double currentTemperature;
    private String priority;
    private List<String> reasons;

    public String getPatientId()
    {
        return patientId;
    }

    public int getCurrentHeartRate()
    {
        return currentHeartRate;
    }

    public void setCurrentHeartRate(int currentHeartRate)
    {
        this.currentHeartRate = currentHeartRate;
    }

    public int getCurrentSpO2()
    {
        return currentSpO2;
    }

    public void setCurrentSpO2(int currentSpO2)
    {
        this.currentSpO2 = currentSpO2;
    }

    public double getCurrentTemperature()
    {
        return currentTemperature;
    }

    public void setCurrentTemperature(double currentTemperature)
    {
        this.currentTemperature = currentTemperature;
    }

    public String getPriority()
    {
        return priority;
    }

    public void setPriority(String priority)
    {
        this.priority = priority;
    }

    public List<String> getReasons()
    {
        return reasons;
    }

    public void setReasons(List<String> reasons)
    {
        this.reasons = reasons;
    }

    public PatientStatus(final String patientId,
                         final int currentHeartRate,
                         final int currentSpO2,
                         final double currentTemperature,
                         final String priority,
                         final List<String> reasons)
    {
        this.patientId = patientId;
        this.currentHeartRate = currentHeartRate;
        this.currentSpO2 = currentSpO2;
        this.currentTemperature = currentTemperature;
        this.priority = priority;
        this.reasons = reasons;
    }
}