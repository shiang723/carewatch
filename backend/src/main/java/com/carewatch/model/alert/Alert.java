package com.carewatch.model.alert;

import java.time.LocalDateTime;

public class Alert
{
    private String patientID;
    private Long id;
    private LocalDateTime timestamp;
    private String severity;
    private String description;
    private boolean isAcknowledged;

    public Alert() {
    }

    public Alert(final String patientID,
                 final Long id,
                 final LocalDateTime timestamp,
                 final String severity,
                 final String description,
                 final Boolean isAcknowledged)
    {
        this.patientID = patientID;
        this.id = id;
        this.timestamp = timestamp;
        this.severity = severity;
        this.description = description;
        this.isAcknowledged = Boolean.TRUE.equals(isAcknowledged);
    }

    public String getPatientID()
    {
        return patientID;
    }

    public void setPatientID(String patientID)
    {
        this.patientID = patientID;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public LocalDateTime getTimestamp()
    {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp)
    {
        this.timestamp = timestamp;
    }

    public String getSeverity()
    {
        return severity;
    }

    public void setSeverity(String severity)
    {
        this.severity = severity;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public boolean isAcknowledged()
    {
        return isAcknowledged;
    }

    public void setAcknowledged(boolean acknowledged)
    {
        isAcknowledged = acknowledged;
    }
}