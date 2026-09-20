class AppError(Exception):
    pass


class CSVValidationError(AppError):
    pass


class FileTooLargeError(AppError):
    pass