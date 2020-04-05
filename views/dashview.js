class DashView {

    constructor() {
        this.backBtn = document.getElementById("back-btn");
        this.returnToGameBtn = document.getElementById("return-to-game-btn");
        this.errorBox = document.getElementById("error-box");
    }

    enableAnalysisMode() {
        this.returnToGameBtn.style.display = "inline";
    }

    disableAnalysisMode() {
        this.returnToGameBtn.style.display = "none";
    }

    updateError(msg) {
        this.errorBox.innerHTML = msg; 
    }

}