package com.carewatch.model;

public class GeminiResponse {
    private final String explanation;

    public GeminiResponse(final String explanation) {
        this.explanation = explanation;
    }

    public String getExplanation() {
        return explanation;
    }
}
