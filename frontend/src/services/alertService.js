/**
 * Fetches alerts persisted by the backend.
 * Endpoint: GET /api/alerts
 */
export async function getAlerts() {
    const response = await fetch('/api/alerts')
    if (!response.ok) {
        throw new Error(`Failed to fetch alerts: ${response.status}`)
    }
    return response.json()
}

/**
 * Acknowledges an alert in the backend.
 * Endpoint: PATCH /api/alerts/{id}/acknowledge
 */
export async function acknowledgeAlert(id) {
    const response = await fetch(`/api/alerts/${id}/acknowledge`, {
        method: 'PATCH',
    })
    if (!response.ok) {
        throw new Error(`Failed to acknowledge alert ${id}: ${response.status}`)
    }
    return response.json()
}
