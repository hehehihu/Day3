
# 🧪 Giới thiệu về Jest

## 1. Jest là gì?
**Jest** là một framework kiểm thử JavaScript phổ biến do Facebook phát triển, được thiết kế đặc biệt để test các ứng dụng React, nhưng cũng hoạt động tốt với mọi dự án JavaScript/TypeScript.

## 2. Tính năng nổi bật
- Dễ cấu hình, dễ sử dụng.
- Tốc độ chạy nhanh nhờ chạy song song và cache.
- Hỗ trợ test đồng bộ & bất đồng bộ.
- Tích hợp sẵn assertions, mocking, snapshot testing.
- Có thể mở rộng bằng plugin.

## 3. Các thành phần cơ bản
| Thành phần | Mô tả |
|------------|------|
| `describe()` | Nhóm các test case cùng chủ đề |
| `test()` hoặc `it()` | Một test case đơn |
| `expect()` | Được dùng để viết các biểu thức kiểm tra (assertion) |
| `beforeEach()` / `afterEach()` | Chạy trước/sau mỗi test |
| `beforeAll()` / `afterAll()` | Chạy trước/sau toàn bộ nhóm test |

## 4. Ví dụ cơ bản

```ts
describe("Math functions", () => {
  test("add should return 5 for 2 + 3", () => {
    const result = 2 + 3;
    expect(result).toBe(5);
  });
});
```

## 5. Jest hoạt động thế nào?
- Khi chạy, Jest sẽ tìm các file `*.test.ts`, `*.test.js`, `*.spec.tsx`...
- Mỗi test được chạy trong môi trường độc lập (sandbox).
- Kết quả sẽ hiển thị rõ pass/fail, số lượng test đã chạy.

