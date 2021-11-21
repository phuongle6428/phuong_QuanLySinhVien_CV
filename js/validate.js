function Validation() {
    this.kiemTraRong = function (input, divId, mess) {
        if (input === "") {
            //show thong bao
            getEle(divId).innerHTML = mess;
            getEle(divId).style.display = "block";
            return false;
        }

        getEle(divId).innerHTML = "";
        getEle(divId).style.display = "none";
        return true;
    };

    this.kiemTraDoDaiKyTu = function (input, divId, mess, min, max) {
        if (input.trim().length >= min && input.trim().length <= max) {
            //Đúng
            getEle(divId).innerHTML = "";
            getEle(divId).style.display = "none";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        getEle(divId).style.display = "block";
        return false;
    };

    this.kiemTraKyTu = function (input, divId, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if (input.match(letter)) {
            //Đúng
            getEle(divId).innerHTML = "";
            getEle(divId).style.display = "none";
            return true;
        }

        //Sai
        getEle(divId).innerHTML = mess;
        getEle(divId).style.display = "block";
        return false;
    };

    this.kiemTraEmail = function (input, divId, mess) {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (input.match(letter)) {
            //Đúng
            getEle(divId).innerHTML = "";
            getEle(divId).style.display = "none";
            return true;
        }

        //Sai
        getEle(divId).innerHTML = mess;
        getEle(divId).style.display = "block";
        return false;
    };

    this.kiemTraMatKhau = function (input, divId, mess) {
        var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (input.match(letter)) {
            //Đúng
            getEle(divId).innerHTML = "";
            getEle(divId).style.display = "none";
            return true;
        }

        //Sai
        getEle(divId).innerHTML = mess;
        getEle(divId).style.display = "block";
        return false;
    };

    this.kiemTraCVu = function (idSelect, divId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            //Đúng
            getEle(divId).innerHTML = "";
            getEle(divId).style.display = "none";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        getEle(divId).style.display = "block";
        return false;
    };

    this.kiemTraSo = function (input, divId, mess, min, max) {
        if (Number.isFinite(input*1) && min <= input*1 && max >= input*1) {
            //Đúng
            getEle(divId).innerHTML = "";
            getEle(divId).style.display = "none";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        getEle(divId).style.display = "block";
        return false;
    };

    this.kiemTraMaTrung = function (input, divId, mess, list) {
        var status = true;

        for (var i = 0; i < list.length; i++) {
            if (list[i].TaiKhoan === input) {
                status = false;
                break;
            }
        }
        if (status) {
            //Đúng
            getEle(divId).innerHTML = "";
            getEle(divId).style.display = "none";
            return true;
        }

        //Sai
        getEle(divId).innerHTML = mess;
        getEle(divId).style.display = "block";
        return false;
    };
}