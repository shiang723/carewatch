package com.carewatch.controller;

import com.carewatch.model.GeminiResponse;
import com.carewatch.service.GeminiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.carewatch.model.GeminiRequest;

@RestController
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(final GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/api/gemini/explain")
    public GeminiResponse explainPatient(@RequestBody GeminiRequest request) {
        return geminiService.generateExplanation(request);
    }
}