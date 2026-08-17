import base64
import requests

# ข้อมูลจำลองสำหรับทดสอบระบบ DLP (ห้ามใช้จริง)
SECRET_API_KEY = "AKIAIOSFODNN7EXAMPLE"  # ตัวอย่างรูปแบบ AWS Key
DB_PASSWORD = "SuperSecretPassword123!"
INTERNAL_SERVER = "10.0.0.5"


def fetch_sensitive_data():
  """จำลองการดึงข้อมูลส่วนตัวและรหัสผ่านจากเซิร์ฟเวอร์ภายใน"""
  auth_header = base64.b64encode(b"admin:" + DB_PASSWORD.encode()).decode()

  headers = {
      "Authorization": f"Basic {auth_header}",
      "X-Api-Key": SECRET_API_KEY,
  }

  url = f"http://{INTERNAL_SERVER}/api/v1/dump-users"

  try:
    response = requests.get(url, headers=headers, timeout=5)
    return response.json()
  except requests.exceptions.RequestException:
    # คืนค่าข้อมูลจำลองเพื่อให้ไฟล์มี Pattern ตรงตามที่ระบบ DLP ค้นหา
    return {
        "status": "success",
        "data": [
            {
                "user": "john.doe@company.com",
                "credit_card": "4111-2222-3333-4444",
            }
        ],
    }


if __name__ == "__main__":
  print("Running security test script...")
  fetch_sensitive_data()