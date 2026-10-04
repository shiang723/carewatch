# CareWatch 🩺

### AI-Powered Patient Monitoring & Triage Assistant

CareWatch is a patient monitoring and triage assistant designed to help healthcare workers make sense of vital signs across multiple patients.

Patient monitors generate a lot of data. CareWatch brings vital signs, trends, and alerts into one dashboard, helping healthcare workers spot concerning changes earlier and understand why a patient was flagged.

> **CareWatch is an educational hackathon prototype and is not intended to replace clinical monitoring systems or professional medical judgment.**

---

## 💡 Inspiration

Nurses and healthcare workers are surrounded by patient monitors, alarms, and constantly changing vital signs. The challenge isn't collecting the data — it's making sense of it across multiple patients.

We wanted to build a simple dashboard that could bring this information together and make it easier to identify which patients are stable, which are changing, and which may need closer attention.

---

## 🚀 What It Does

CareWatch provides a centralized dashboard for patient monitoring.

### Patient Monitoring
- Displays current heart rate, SpO₂, and temperature
- Shows multiple patients in one dashboard
- Displays patient status and priority

### Alerts & Priority
- Uses predefined Java rules to evaluate patient vital signs
- Classifies patients as:
  - 🟢 **STABLE**
  - 🟡 **MONITOR**
  - 🔴 **HIGH**
- Provides the reasons behind each priority level
- Automatically highlights concerning vital sign patterns

### Vital Trends
- Stores historical vital readings
- Displays changes in heart rate, SpO₂, and temperature
- Helps healthcare workers see whether a patient's condition is changing over time

### Gemini Patient Insights
CareWatch uses the Gemini API to explain why a patient was flagged.

The system follows an important separation:

**Java determines the priority → Gemini explains the result**

Gemini does not determine the patient's priority, diagnose the patient, or recommend treatment.

---

## 🛠️ How We Built It

### Frontend
- React
- Vite
- JavaScript
- React Markdown
- Lucide React

### Backend
- Java
- Spring Boot
- REST APIs
- Maven

### AI
- Google Gemini API
- Google GenAI Java SDK

### Data
- Mock patient data
- Historical vital readings
- JSON-based data

### Development
- Git
- GitHub
- IntelliJ IDEA
- npm

---

## 🏗️ Architecture

```text
Patient Vital Data
       ↓
Java / Spring Boot
       ↓
Rule Engine
       ↓
Priority + Alert Reasons
       ↓
REST API
       ↓
React Dashboard
       ↓
Gemini Patient Explanation
