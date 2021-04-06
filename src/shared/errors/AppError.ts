class AppError {
  status: number;
  description: string;

  constructor(description: string, status = 400) {
    this.status = status;
    this.description = description;
  }
}

export default AppError;
