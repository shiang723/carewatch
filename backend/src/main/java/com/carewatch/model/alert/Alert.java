package com.carewatch.model.alert;

import java.time.LocalDateTime;

class Alert
{
    private final String patientID;
    private final Long id;
    private final LocalDateTime timestamp;
    private final String severity;
    private final String description;
    private boolean isAcknowledged;

     Alert(final String patientID,
                 final Long id,
                 final LocalDateTime timestamp,
                 final String severity,
                 final String description,
                 final boolean isAcknowledged)
    {
        this.patientID = patientID;
        this.id = id;
        this.timestamp = timestamp;
        this.severity = severity;
        this.description = description;
        this.isAcknowledged = isAcknowledged;
    }

    public String getPatientID()
    {
        return patientID;
    }

    public Long getId()
    {
        return id;
    }

    public LocalDateTime getTimestamp()
    {
        return timestamp;
    }

    public String getSeverity()
    {
        return severity;
    }

    public String getDescription()
    {
        return description;
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