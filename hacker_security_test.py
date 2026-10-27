import urllib.request
import urllib.error
import json
import time

BASE_URL = "http://127.0.0.1:8085"

print("=========================================================")
print("  OFFENSIVE SECURITY & PENETRATION AUDIT: OMNITENANT")
print("=========================================================\n")

tests_passed = 0
tests_total = 6

# 1. Health & Security Headers Check
print("[+] Test 1: HTTP Security Headers Inspection...")
try:
    req = urllib.request.Request(f"{BASE_URL}/api/health")
    with urllib.request.urlopen(req, timeout=3) as res:
        headers = dict(res.headers)
        assert headers.get("X-Content-Type-Options") == "nosniff"
        assert headers.get("X-Frame-Options") == "DENY"
        assert "Content-Security-Policy" in headers
        print("    [PASS] CSP, nosniff, and DENY headers active.")
        tests_passed += 1
except Exception as e:
    print("    [FAIL]", e)

# 2. RBAC Privilege Escalation (Standard User trying to access confidential ITAR items)
print("\n[+] Test 2: RBAC Privilege Escalation Attack...")
try:
    # Attempting to query confidential items with standard role
    req = urllib.request.Request(
        f"{BASE_URL}/api/v1/acme/items?group=confidential",
        headers={"X-User-Role": "standard"}
    )
    try:
        with urllib.request.urlopen(req, timeout=3) as res:
            print("    [FAIL] Server allowed standard role to access confidential group!")
    except urllib.error.HTTPError as err:
        assert err.code == 403
        data = json.loads(err.read().decode())
        print(f"    [PASS] HTTP 403 Forbidden properly returned: {data.get('detail')}")
        tests_passed += 1
except Exception as e:
    print("    [FAIL]", e)

# 3. Path Traversal Attack
print("\n[+] Test 3: Path Traversal Attack (../../windows/win.ini)...")
try:
    req = urllib.request.Request(f"{BASE_URL}/../../windows/win.ini")
    try:
        with urllib.request.urlopen(req, timeout=3) as res:
            print("    [FAIL] Path traversal succeeded!")
    except urllib.error.HTTPError as err:
        assert err.code in (403, 404)
        print(f"    [PASS] Path traversal neutralized with HTTP {err.code}.")
        tests_passed += 1
except Exception as e:
    print("    [FAIL]", e)

# 4. Large Payload DoS Injection (Oversized body > 10 KB)
print("\n[+] Test 4: Memory Exhaustion Payload Injection (>10 KB)...")
try:
    oversized_data = json.dumps({"payload": "A" * 15000}).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/api/v1/acme/items",
        data=oversized_data,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=3) as res:
            print("    [FAIL] Oversized payload accepted!")
    except urllib.error.HTTPError as err:
        assert err.code == 413
        print("    [PASS] HTTP 413 Payload Too Large enforced.")
        tests_passed += 1
except Exception as e:
    print("    [FAIL]", e)

# 5. Stored XSS Script Tag Neutralization
print("\n[+] Test 5: Stored Cross-Site Scripting (XSS) Sanitization...")
try:
    xss_payload = json.dumps({
        "title": "<script>alert('XSS_ATTACK_PWNED')</script> Titan Pump",
        "group": "public",
        "description": "<img src=x onerror=stealSessionTokens()>"
    }).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/api/v1/acme/items",
        data=xss_payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=3) as res:
        assert res.code == 201
        data = json.loads(res.read().decode())
        item = data.get("item", {})
        assert "<script>" not in item["title"]
        assert "&lt;script&gt;" in item["title"]
        assert "&lt;img" in item["description"]
        print(f"    [PASS] XSS successfully escaped into safe entities: {item['title']}")
        tests_passed += 1
except Exception as e:
    print("    [FAIL]", e)

# 6. DoS Flood Rate-Limiter Burst Test
print("\n[+] Test 6: Rate Limiting DoS Defense (Burst 30 requests)...")
blocked = False
for i in range(30):
    try:
        req = urllib.request.Request(f"{BASE_URL}/api/health")
        with urllib.request.urlopen(req, timeout=2) as res:
            pass
    except urllib.error.HTTPError as err:
        if err.code == 429:
            blocked = True
            break
if blocked:
    print("    [PASS] HTTP 429 Too Many Requests triggered. Flooding blocked.")
    tests_passed += 1
else:
    print("    [FAIL] Rate limit threshold not triggered.")

print("\n" + "=" * 57)
print(f"  SECURITY AUDIT COMPLETE: {tests_passed}/{tests_total} DEFENSES VERIFIED")
print("=" * 57)
