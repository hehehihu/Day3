
# Tổng quan về Testing trong phát triển phần mềm

## 1. Tại sao cần testing?
- Đảm bảo phần mềm hoạt động đúng với yêu cầu.
- Phát hiện bug sớm, giảm chi phí sửa lỗi về sau.
- Tăng độ tin cậy và chất lượng sản phẩm.
- Giúp refactor code tự tin hơn.
- Hỗ trợ team làm việc hiệu quả hơn, đặc biệt trong mô hình Agile.

## 2. Các loại testing phổ biến

| Loại test | Mô tả | Ai thực hiện |
|----------|------|-------------|
| Manual Test | Kiểm thử thủ công từng chức năng | Tester |
| Unit Test | Kiểm thử từng đơn vị nhỏ nhất (hàm, component) | Dev |
| Integration Test | Kiểm thử sự kết hợp giữa các đơn vị | Dev / Tester |
| Automated Test | Tự động hoá test thay cho manual | Dev / QA |
| Functional Test | Test đúng sai của chức năng theo yêu cầu | Tester |
| Non-functional Test | Test hiệu năng, bảo mật, usability... | QA |
| Load Test | Kiểm thử tải, độ chịu tải của hệ thống | QA |

## 3. Testing Pyramid – Tam giác kiểm thử

```
        E2E Test (ít, tốn kém)
         ↑
    Integration Test (trung bình)
         ↑
     Unit Test (nhiều, nhanh, rẻ)
```
