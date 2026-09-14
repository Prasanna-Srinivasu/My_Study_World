const API_URL = "http://localhost:8080/api";

export async function getCourses() {
  const response = await fetch(`${API_URL}/courses`);

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}