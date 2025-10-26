const form = document.getElementById('js-form');
const nameInput = document.getElementById('js-name');
const emailInput = document.getElementById('js-email');
const passwordInput = document.getElementById('js-password');

form.addEventListener("submit", addUser);

// ユーザー登録
async function addUser(e) {
    // フォームの自動送信を防ぐ
    e.preventDefault();

    // 全てのエラーをリセット
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // 現在の入力値を取得
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            // バリデーションエラーがある場合
            if (data.errors) {
                if (data.errors.name) {
                    document.getElementById("error-name").textContent = data.errors.name[0];
                }
                if (data.errors.email) {
                    document.getElementById("error-email").textContent = data.errors.email[0];
                }
                if (data.errors.password) {
                    document.getElementById("error-password").textContent = data.errors.password[0];
                }
            }
            return;
        }
        alert("登録が完了しました！");
        form.reset();
    } catch (error) {
        console.error("通信エラー：", error);
        alert("サーバーとの通信に失敗しました。")
    }
}
