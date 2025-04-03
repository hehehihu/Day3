
# Giới thiệu về Code Coverage

## 1. Code Coverage là gì?
**Code Coverage** (bao phủ mã nguồn) là chỉ số thể hiện mức độ các dòng code đã được chạy qua khi thực hiện test. Nó giúp đo lường chất lượng và độ đầy đủ của bộ test.

## 2. Lợi ích của code coverage
- Đánh giá mức độ test có đủ bao phủ logic không.
- Phát hiện phần code chưa được kiểm thử.
- Giúp tối ưu và bổ sung test case cần thiết.
- Tăng độ tin cậy khi refactor code.

## 3. Các tiêu chí chính trong code coverage

| Tiêu chí | Mô tả |
|----------|-------|
| **Statements** | Bao nhiêu dòng code (statement) đã được chạy qua |
| **Branches**   | Bao nhiêu nhánh điều kiện (`if`, `else`, `switch`, ...) đã được kiểm thử |
| **Functions**  | Bao nhiêu function đã được gọi trong quá trình test |
| **Lines**      | Bao nhiêu dòng code đã thực sự được thực thi (gần giống Statements) |

## 4. Ví dụ minh hoạ

```ts
function isPositive(n: number) {
  if (n > 0) return true;
  else return false;
}
```

- Statement: 3 dòng
- Branch: 2 nhánh (`if` và `else`)
- Function: 1 function

→ Nếu chỉ test `isPositive(1)`, branch `else` sẽ **không được bao phủ**.

## 5. Cách đo code coverage bằng Jest

```bash
npm run test -- --coverage
```

→ Kết quả sẽ hiển thị:

```
Statements   : 85%
Branches     : 70%
Functions    : 90%
Lines        : 83%
```

## 6. Tốt nhất là bao nhiêu phần trăm?
- Mức an toàn: **80% trở lên**
- Lý tưởng: **>90%** nhưng đừng cố đạt 100% nếu không cần thiết.
