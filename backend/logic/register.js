function checkAccessCode(accessCode, accountType) {
    if (accessCode == "$PkndP5a&sFJoHFNAGa!" && accountType == "agent" || accessCode == "!ynA88@e$ySMaeyKN&@s" && accountType == "admin") {
        return true
    }
    else {
        return false
    }
}

module.exports = {
    checkAccessCode
}