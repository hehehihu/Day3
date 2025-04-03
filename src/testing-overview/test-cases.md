
# Test Case – Đăng nhập & Đăng ký

## Test Case: Đăng nhập (Login)

| TC ID | Mô tả | Input | Kỳ vọng | Ghi chú |
|-------|-------|-------|---------|--------|
| TC01 | Username và Password hợp lệ | user: "emilys", pass: "emilyspass" | Đăng nhập thành công, điều hướng /account | Happy path |
| TC02 | Bỏ trống username | "", "emilyspass" | Hiển thị lỗi "Vui lòng nhập username" | Validation |
| TC03 | Bỏ trống password | "emilys", "" | Hiển thị lỗi "Vui lòng nhập password" | Validation |
| TC04 | Cả hai trường trống | "", "" | Hiển thị lỗi "Vui lòng nhập đầy đủ thông tin" | Validation |
| TC05 | Sai thông tin đăng nhập | "wrong", "wrong" | Hiển thị lỗi "Đăng nhập thất bại" | API Fail |
| TC06 | API trả về lỗi | Network error | Hiển thị lỗi mạng hoặc thông báo lỗi khác | Exception |

---

## Test Case: Đăng ký (Register)

| TC ID | Mô tả | Input | Kỳ vọng | Ghi chú |
|-------|-------|-------|---------|--------|
| TC01 | Đăng ký thành công | Email hợp lệ, pass mạnh | Thông báo đăng ký thành công, điều hướng /login | Happy path |
| TC02 | Bỏ trống email | "", "123456" | Hiển thị lỗi "Email không được để trống" | Validation |
| TC03 | Email sai định dạng | "abc@", "123456" | Hiển thị lỗi "Email không hợp lệ" | Regex |
| TC04 | Password yếu | "user@gmail.com", "123" | Hiển thị lỗi "Mật khẩu quá ngắn" | Validation |
| TC05 | Cả hai trường trống | "", "" | Hiển thị lỗi cả 2 trường | Validation |
| TC06 | Email đã tồn tại | "tontai@gmail.com", "123456" | Hiển thị lỗi "Email đã tồn tại" | API fail |
| TC07 | API lỗi | Network error | Hiển thị lỗi mạng | Exception |
