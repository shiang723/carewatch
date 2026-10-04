/**
 * Fetches all patients with their current vitals from the backend.
 * Endpoint: GET /api/patients
 */
export async function getPatients() {
    const response = await fetch('/api/patients')
    if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.status}`)
    }
    return response.json()
}

/**
 * Fetches historical vital readings for a specific patient.
 * Endpoint: GET /api/patients/{patientId}/history
 */
export async function getPatientHistory(patientId) {
    const response = await fetch(`/api/patients/${patientId}/history`)
    if (!response.ok) {
        throw new Error(`Failed to fetch history for patient ${patientId}: ${response.status}`)
    }
    return response.json()
}

/**
 * Fetches the evaluated monitoring status for a specific patient.
 * Endpoint: GET /api/alerts/patient/{patientId}/status
 */
export async function getPatientStatus(patientId) {
    const response = await fetch(`/api/alerts/patient/${patientId}/status`)
    if (!response.ok) {
        throw new Error(`Failed to fetch status for patient ${patientId}: ${response.status}`)
    }
    return response.json()
}