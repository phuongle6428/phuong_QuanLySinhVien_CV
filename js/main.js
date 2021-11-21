var DSnhanvien = new DSNhanVien();
var validation = new Validation();
function getEle(id) {
    return document.getElementById(id);
}
GetLocal();
function layThongTinNV(isAdd) {
    //Lấy thông tin user nhập vào
    var _TKhoan = getEle("tknv").value;
    var _HTen = getEle("name").value;
    var _Email = getEle("email").value;
    var _MKhau = getEle("password").value;
    var _NLam = getEle("datepicker").value;
    var _Salary = getEle("luongCB").value;
    var _CVu = getEle("chucvu").value;
    var _TGLam = getEle("gioLam").value;

    //flag
    var isValid = true;

    //check validation TKhoan
    if (isAdd) {
        isValid &=
            validation.kiemTraRong(
                _TKhoan,
                "tbTKNV",
                "(*) Vui lòng nhập TKhoan!"
            ) &&
            validation.kiemTraDoDaiKyTu(
                _TKhoan,
                "tbTKNV",
                "(*) Vui lòng nhập từ 4 - 6 ký tự",
                4,
                6
            ) &&
            validation.kiemTraMaTrung(
                _TKhoan,
                "tbTKNV",
                "(*) Mã TKhoan đã tồn tại!",
                DSnhanvien.list
            );
    }

    //check validation HTen
    isValid &=
        validation.kiemTraRong(
            _HTen,
            "tbTen",
            "(*) Vui lòng nhập HTen!"
        ) &&
        validation.kiemTraKyTu(
            _HTen,
            "tbTen",
            "(*) Vui lòng nhập vào chữ!"
        );

    //check validation email
    isValid &=
        validation.kiemTraRong(
            _Email,
            "tbEmail",
            "(*) Vui lòng nhập email!"
        ) &&
        validation.kiemTraEmail(
            _Email,
            "tbEmail",
            "(*) Email k đúng định dạng"
        );

    //check validation matKhau
    isValid &=
        validation.kiemTraRong(
            _MKhau,
            "tbMatKhau",
            "(*) Vui lòng nhập pass!"
        ) &&
        validation.kiemTraMatKhau(
            _MKhau,
            "tbMatKhau",
            "(*) Sai định dạng!"
        );

    //check validation date
    isValid &= validation.kiemTraRong(
        _NLam,
        "tbNgay",
        "(*) Vui lòng nhập NLam!"
    );

    //check validation Salary
    isValid &=
    validation.kiemTraRong(
        _Salary,
        "tbLuongCB",
        "(*) Vui lòng nhập pass!"
    ) &&
    validation.kiemTraSo(
        _Salary,
        "tbLuongCB",
        "(*) Sai mức lương - lương từ 1 triệu đến 20 triệu!",
        1000000,
        20000000
    );

    //check validation TGLam
    isValid &=
    validation.kiemTraRong(
        _TGLam,
        "tbGiolam",
        "(*) Vui lòng nhập pass!"
    ) &&
    validation.kiemTraSo(
        _TGLam,
        "tbGiolam",
        "(*) Sai số giờ làm - giờ làm từ 80 đến 200 giờ!",
        80,
        200
    );

    //check validation chuc vu
    isValid &= validation.kiemTraCVu(
        "chucvu",
        "tbChucVu",
        "(*) Vui lòng chọn Chuc Vu"
    );

    if (isValid) {
        var nhanvien = new NhanVien(_TKhoan,_HTen,_Email,_MKhau,_NLam,_Salary,_CVu,_TGLam);
        nhanvien.TTenCvu();
        nhanvien.TTongLuong();
        nhanvien.TXepLoai();
        return nhanvien;
    }
    return null;
}
document.getElementById("btnThemNV").addEventListener("click", ThemNhanVien)
function ThemNhanVien() {
    console.log(1)
    var nhanvien = layThongTinNV(true);

    if (!nhanvien) return;
    DSnhanvien.ThemNV(nhanvien);
    TaoBangDSNV(nhanvien);
    SetLocal();
}
function TaoBangDSNV(obj) {
    var tagTR = document.createElement("TR");
    var content;
    content = `
        <td>${obj.TaiKhoan}</td>
        <td>${obj.HoTen}</td>
        <td>${obj.Email}</td>
        <td>${obj.NgayLam}</td>
        <td>${obj.ChucVu}</td>
        <td>${obj.TongLuong}</td>
        <td>${obj.XepLoai}</td>
        <td class="d-flex">
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="SuaNV('${obj.TaiKhoan}')">Sửa</button>
            <button class="btn btn-danger" onclick="XoaNV('${obj.TaiKhoan}')">Xóa</button>
        </td>`
    tagTR.innerHTML = content;
    getEle("tableDanhSach").appendChild(tagTR);
}
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = DSnhanvien.timKiemNV(keyword);
    getEle("tableDanhSach").innerHTML = ""
    for (i=0; i <= mangTimKiem.length - 1; i++) {
        TaoBangDSNV(mangTimKiem[i]);
    }
});
// Xóa Nhan Vien
function XoaNV(TaiKhoan) {
    DSnhanvien.XoaNV(TaiKhoan);
    getEle("tableDanhSach").innerHTML = ""
    for (i=0; i <= DSnhanvien.list.length - 1; i++) {
        TaoBangDSNV(DSnhanvien.list[i]);
    }
    SetLocal();
}
// Sửa Nhan vien
function SuaNV(TaiKhoan) {
    //Hiển thị thông sinh viên ra ngoài form
    var nhanvien = DSnhanvien.SuaNV(TaiKhoan);

    if (nhanvien) {
        getEle("tknv").value = nhanvien.TaiKhoan;
        //khóa input txtMaSV
        getEle("tknv").disabled = true;
        getEle("name").value = nhanvien.HoTen;
        getEle("email").value = nhanvien.Email;
        getEle("password").value = nhanvien.MatKhau;
        getEle("datepicker").value = nhanvien.NgayLam;
        getEle("luongCB").value = nhanvien.Salary;
        getEle("gioLam").value = nhanvien.TGLam;
        getEle("chucvu").value = "0";
    }
}
getEle("btnCapNhat").addEventListener("click", function () {
    //lấy thông từ các thẻ input
    var nhanvien = layThongTinNV(false);
    if (nhanvien) {
        //Cập nhật NV
        DSnhanvien.CapNhapNV(nhanvien);
        getEle("tableDanhSach").innerHTML = ""
        for (i=0; i <= DSnhanvien.list.length - 1; i++) {
            TaoBangDSNV(DSnhanvien.list[i]);
        }
        SetLocal();
    }
});
// Set and get Localstorage
function SetLocal () {
    var DSNVstring = JSON.stringify(DSnhanvien.list);
    localStorage.setItem("DSNV", DSNVstring)
}
function GetLocal () {
    if(localStorage.getItem("DSNV")) {
        DSnhanvien.list = JSON.parse(localStorage.getItem("DSNV"));
        for (i=0; i <= DSnhanvien.list.length - 1; i++) {
            TaoBangDSNV(DSnhanvien.list[i]);
        }
    }
}