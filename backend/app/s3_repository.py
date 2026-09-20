import os

import boto3


BUCKET_NAME = os.environ.get(
    "RAW_CSV_BUCKET_NAME"
)

_s3 = None


def get_s3_client():
    global _s3

    if _s3 is None:
        _s3 = boto3.client("s3")

    return _s3


def upload_csv(
    content: str,
    object_key: str,
) -> None:

    if not BUCKET_NAME:
        raise RuntimeError(
            "RAW_CSV_BUCKET_NAME is not configured."
        )

    client = get_s3_client()

    client.put_object(
        Bucket=BUCKET_NAME,
        Key=object_key,
        Body=content.encode("utf-8"),
        ContentType="text/csv",
        ServerSideEncryption="AES256",
    )