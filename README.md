# Introduction

After studying the current system and proposing a theoretical solution, this phase aims to frame the project and define its use cases in order to better situate it within its general context. For this, we start by presenting the actors, functional requirements, non-functional requirements, and conclude with the use case presentation of the application.

## I. Actors

An actor is the idealization of a role played by an external person, process, or entity that interacts with a system. The actors in our system are:

- **Internship Supervisor**: Responsible for managing internships.
- **Teacher**: Any teacher affiliated with ENICar.
- **Student**: Any student affiliated with ENICar.

## II. Functional Requirements

Functional requirements express actions that the system must perform in response to a request.

### Internship Supervisor

- Manage students:
  - Add a student.
  - Modify a student.
  - Remove a student.
- Manage teachers:
  - Add a teacher.
  - Modify a teacher.
  - Remove a teacher.
- Manage departments:
  - Add a department.
  - Modify a department.
  - Remove a department.
- Manage rooms:
  - Add a room.
  - Modify a room.
  - Remove a room.
- Manage companies:
  - Add a company.
  - Modify a company.
  - Deactivate a company.
- Manage presentations:
  - Schedule rooms, juries, dates, and final project topics.
- Manage internship documents.

### Teacher

- Manage their profile.
- Manage supervision requests sent by students.
- View and track students and their final project topics.
- View presentations assigned to them.
- Submit grades if they are the head of the jury.
- Send and receive comments with students.
- Track internship progress through Trello.

### Student

- Manage their profile.
- Download the internship agreement.
- Send and track supervision requests to teachers.
- Submit documents (Assignment Letter, Internship Certificate, etc.).
- Send and receive comments with the supervisor.
- Indicate progress through Trello.

## III. Non-Functional Requirements

The system must meet certain indispensable requirements for its operation, which are important in terms of service quality, such as:

- **Reliability**: The application must operate consistently without errors.
- **Error Management**: The application must notify users of any potential errors via alert messages.
- **Ergonomics and Good UI/UX**: The software should be user-friendly and easy to update.
- **Efficiency**: The application must allow task completion with minimal manipulation and maximum precision.
- **Ease of Use**: The application should be easy to understand for a regular user.
- **Security**: To ensure good data security, an authentication interface must be created.

## IV. Conclusion and Future Prospects

In conclusion, the development of the internship management system for ENICar represents significant progress in optimizing academic processes. This system offers a centralized and user-friendly platform for the efficient management of internships, facilitating coordination between students, teachers, and university supervisors. The successful implementation of this system will enable ENICar to streamline its operations, improve transparency and traceability of internship processes, and provide an enriching experience for participating students.

## Technologies Used

- **Frontend**: Angular, Angular Material
- **Backend**: Spring Boot, Spring Security, JWT (for user authentication and authorization)
- **Database**: MySQL
- **Security**: Spring Security for securing endpoints, JWT for token-based authentication
- **User Management**: Multi-user system with different roles (students, teachers, internship supervisors)
- **Task Management Integration**: Trello API for managing internship progress
- **Email Service**: Spring Mail for sending automated emails (e.g., notifications)
- **Version Control**: Git, GitHub
- **Build Tool**: Maven for managing dependencies and building the Spring Boot application
