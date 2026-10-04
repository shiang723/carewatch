package com.carewatch.service;

import com.google.genai.Client;
import com.carewatch.model.GeminiRequest;
import com.carewatch.model.GeminiResponse;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    public GeminiResponse generateExplanation(final GeminiRequest request) {
        String prompt = "Explain this patient's monitoring status clearly and briefly. "
                + "Do not diagnose, recommend treatment, or tell healthcare workers what action to take. "
                + "The priority and alert reasons were determined by Java rules. "
                + "Patient ID: " + request.getPatientID()
                + ", Heart rate: " + request.getHeartRate()
                + " BPM, SpO2: " + request.getSpO2()
                + "%, Temperature: " + request.getTemperature()
                + " C, Priority: " + request.getPriority()
                + ", Alert reasons: " + request.getAlertReasons();

        GenerateContentResponse response = client.models.generateContent(
                "gemini-3.8-flash",
                prompt,
                null);

        String explanation = response.text();

        return new GeminiResponse(explanation);
    }

    private final Client client = new Client();
}
