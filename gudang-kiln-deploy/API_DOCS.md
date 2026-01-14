# Gudang Kiln - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Materials

#### GET `/api/materials`
Get all materials with optional filtering.

**Query Parameters:**
- `q` - Search by name or code (optional)
- `warehouseId` - Filter by warehouse (optional)

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

#### POST `/api/materials`
Create a new material.

**Body:**
```json
{
  "code": "SKU-001",
  "name": "Material Name",
  "unit": "PCS",
  "category": "Electronics",
  "minStock": 10,
  "warehouseId": "W01"
}
```

#### GET `/api/materials/[id]`
Get single material by ID.

#### PATCH `/api/materials/[id]`
Update material details.

#### DELETE `/api/materials/[id]`
Delete a material.

---

### Warehouses

#### GET `/api/warehouses`
Get all warehouses.

#### POST `/api/warehouses`
Create a new warehouse.

**Body:**
```json
{
  "name": "Gudang Utama",
  "location": "Blok A"
}
```

---

### Transactions

#### GET `/api/transactions`
Get transaction history.

**Query Parameters:**
- `type` - Filter by IN or OUT (optional)
- `materialId` - Filter by material (optional)

---

### Audit

#### GET `/api/audit`
Get audit summary statistics.

#### POST `/api/audit`
Perform stock reconciliation.

**Body:**
```json
{
  "materialId": "MAT-001",
  "physicalCount": 50
}
```

---

### Reports

#### GET `/api/reports`
Generate transaction reports with filters.

**Query Parameters:**
- `startDate` - Filter from date (ISO format)
- `endDate` - Filter to date (ISO format)
- `type` - Filter by IN or OUT

**Response includes summary statistics.**

---

### Settings

#### GET `/api/settings`
Get application settings (theme, colors, app name).

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error
