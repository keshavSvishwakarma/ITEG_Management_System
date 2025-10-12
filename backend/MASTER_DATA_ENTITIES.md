# ITEG Management System - Master Data Entities Documentation

## Overview
This document identifies all master data entities for the ITEG Management System that can be stored in a cloud-based master database. Master data represents stable reference data that rarely changes and is shared across multiple business processes.

---

## Master Data Entities

### 1. Users (Administrative Staff)

| Field | Data Type | Required | Unique | Description |
|-------|-----------|----------|--------|-------------|
| _id | ObjectId | Yes | Yes | Primary key |
| position | String | Yes | No | Job position/designation |
| profileImage | String | No | No | Profile image URL/Base64 |
| name | String | Yes | No | Full name of user |
| email | String | Yes | Yes | Email address (unique identifier) |
| mobileNo | String | Yes | No | Mobile phone number |
| adharCard | String | Yes | Yes | Aadhaar card number (unique) |
| password | String | Yes | No | Encrypted password |
| role | String | No | No | User role (default: 'admin') |
| department | String | Yes | No | Department name |
| googleId | String | No | No | Google OAuth ID |
| faceDescriptor | Array | No | No | Face recognition data |
| isActive | Boolean | No | No | Account status (default: true) |
| createdAt | Date | No | No | Record creation timestamp |
| updatedAt | Date | No | No | Record update timestamp |

**Purpose**: Manages administrative staff, faculty, and system users with authentication and authorization.

---

### 2. Companies

| Field | Data Type | Required | Unique | Description |
|-------|-----------|----------|--------|-------------|
| _id | ObjectId | Yes | Yes | Primary key |
| companyName | String | Yes | Yes | Company name (unique identifier) |
| hrEmail | String | Yes | No | HR contact email |
| hrContact | String | No | No | HR contact phone number |
| location | String | Yes | No | Company location/address |
| companyLogo | String | No | No | Company logo (Base64/URL) |
| industry | String | No | No | Industry sector |
| website | String | No | No | Company website URL |
| description | String | No | No | Company description |
| createdAt | Date | No | No | Record creation timestamp |
| updatedAt | Date | No | No | Record update timestamp |

**Purpose**: Master registry of companies for placement activities and partnerships.

---

### 3. Courses & Academic Programs

| Field | Data Type | Required | Unique | Description |
|-------|-----------|----------|--------|-------------|
| courseCode | String | Yes | Yes | Unique course identifier |
| courseName | String | Yes | No | Full course name |
| stream | String | Yes | No | Academic stream (Engineering, Arts, etc.) |
| duration | Number | Yes | No | Course duration in years |
| department | String | Yes | No | Associated department |
| eligibilityCriteria | String | No | No | Admission eligibility |
| isActive | Boolean | No | No | Course availability status |

**Purpose**: Reference data for academic courses and programs offered by the institution.

*Note: This entity is inferred from student data but should be created as a separate master entity.*

---

### 4. Departments

| Field | Data Type | Required | Unique | Description |
|-------|-----------|----------|--------|-------------|
| departmentCode | String | Yes | Yes | Unique department identifier |
| departmentName | String | Yes | Yes | Department name |
| headOfDepartment | String | No | No | HOD name |
| contactEmail | String | No | No | Department contact email |
| contactPhone | String | No | No | Department contact phone |
| isActive | Boolean | No | No | Department status |

**Purpose**: Organizational structure reference for departments within the institution.

*Note: This entity is inferred from user data but should be created as a separate master entity.*

---

### 5. Academic Levels/Stages

| Field | Data Type | Required | Unique | Description |
|-------|-----------|----------|--------|-------------|
| levelCode | String | Yes | Yes | Level identifier (1A, 1B, 2A, etc.) |
| levelName | String | Yes | No | Descriptive level name |
| sequence | Number | Yes | No | Level order/sequence |
| prerequisites | Array | No | No | Required previous levels |
| topics | Array | No | No | Topics covered in this level |
| passingCriteria | Object | No | No | Minimum marks/criteria |
| isActive | Boolean | No | No | Level availability status |

**Purpose**: Academic progression levels for student advancement tracking.

*Note: This entity is inferred from admitted student level data.*

---

### 6. Job Profiles/Positions

| Field | Data Type | Required | Unique | Description |
|-------|-----------|----------|--------|-------------|
| profileCode | String | Yes | Yes | Unique job profile identifier |
| profileName | String | Yes | No | Job profile/position name |
| category | String | Yes | No | Job category (Technical, HR, etc.) |
| skillsRequired | Array | No | No | Required skills |
| experienceLevel | String | No | No | Experience level required |
| salaryRange | Object | No | No | Min/Max salary range |
| isActive | Boolean | No | No | Profile availability status |

**Purpose**: Standardized job profiles for placement activities and career guidance.

*Note: This entity is inferred from placement data but should be created as a separate master entity.*

---

### 7. Geographic Locations

| Field | Data Type | Required | Unique | Description |
|-------|-----------|----------|--------|-------------|
| locationCode | String | Yes | Yes | Unique location identifier |
| city | String | Yes | No | City name |
| state | String | Yes | No | State name |
| country | String | Yes | No | Country name |
| region | String | No | No | Geographic region |
| isActive | Boolean | No | No | Location status |

**Purpose**: Standardized location reference for addresses, company locations, and placement locations.

*Note: This entity is inferred from student and company address data.*

---

## Entity Relationships

### Primary Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Users → Departments | Many-to-One | Each user belongs to one department |
| Companies → Locations | Many-to-One | Each company has a primary location |
| Courses → Departments | Many-to-One | Each course belongs to one department |
| Job Profiles → Companies | Many-to-Many | Companies offer multiple job profiles |
| Academic Levels → Courses | Many-to-One | Levels are specific to courses |

### Secondary Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Users → Companies | Many-to-Many | Users manage multiple companies |
| Departments → Locations | One-to-Many | Departments may have multiple locations |
| Job Profiles → Academic Levels | Many-to-Many | Job profiles may require specific levels |

---

## Cloud Database Design Recommendations

### Amazon DocumentDB/MongoDB Collections Structure

```javascript
// Recommended Collection Names
- users
- companies  
- courses
- departments
- academic_levels
- job_profiles
- locations
```

### Indexing Strategy

```javascript
// Primary Indexes
users: { email: 1, adharCard: 1 }
companies: { companyName: 1 }
courses: { courseCode: 1 }
departments: { departmentCode: 1 }
academic_levels: { levelCode: 1 }
job_profiles: { profileCode: 1 }
locations: { locationCode: 1 }

// Secondary Indexes
users: { department: 1, role: 1, isActive: 1 }
companies: { location: 1, industry: 1 }
courses: { stream: 1, department: 1, isActive: 1 }
```

### Data Governance

1. **Data Quality Rules**
   - Email validation for users and companies
   - Phone number format validation
   - Unique constraints on critical identifiers

2. **Master Data Management**
   - Centralized master data updates
   - Change approval workflows for critical entities
   - Data lineage tracking

3. **Security & Access Control**
   - Role-based access to master data
   - Audit logging for all master data changes
   - Data encryption for sensitive fields

---

## Implementation Notes

1. **Separation of Concerns**: Master data should be separated from transactional data (student admissions, placements, attendance)

2. **API Design**: Create dedicated master data APIs for CRUD operations on these entities

3. **Caching Strategy**: Implement caching for frequently accessed master data (courses, departments, locations)

4. **Data Synchronization**: Establish sync mechanisms between master database and operational databases

5. **Backup & Recovery**: Implement robust backup strategies for master data preservation

---

## Excluded Transactional Data

The following entities are **NOT** considered master data and should remain in operational databases:

- StudentAdmissionProcess (transactional admission data)
- AdmittedStudent (student academic progress and placement records)
- Interview Records (placement interview tracking)
- Attendance Records (daily attendance tracking)
- OTP Records (authentication tokens)
- Placement Records (individual placement transactions)

---

*Document Version: 1.0*  
*Last Updated: December 2024*  
*Prepared for: ITEG Management System Cloud Migration*