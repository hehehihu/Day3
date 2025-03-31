graph TD
    UI[UI (View)]
    AC[Action Creator]
    A[Action]
    D[Dispatch]
    M[Middleware<br/>(Thunk/Saga)]
    R[Reducer]
    S[Redux Store]
    UR[UI Render lại]

    UI --> AC
    AC --> A
    A --> D
    D --> M
    M --> R
    R --> S
    S --> UR
    UR --> UI


UI: Người dùng tương tác → gọi dispatch.

Action Creator: Tạo ra Action.

Dispatch: Gửi action vào store.

Middleware: Xử lý bất đồng bộ hoặc logic phụ trợ.

Reducer: Nhận action & state → trả ra state mới.

Redux Store: Cập nhật và lưu trữ state.

UI Render lại: Tự động cập nhật theo state mới.