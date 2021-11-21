function NhanVien(_TKhoan,_HTen,_Email,_MKhau,_NLam,_Salary,_CVu,_TGLam) {
    this.TaiKhoan = _TKhoan;
    this.HoTen = _HTen;
    this.Email = _Email;
    this.MatKhau = _MKhau;
    this.NgayLam = _NLam;
    this.Salary = _Salary;
    this.TGLam = _TGLam;
    this.ChucVu = "";
    this.TTenCvu =  function () {
        if(_CVu*1 == 3) {
            return this.ChucVu = "Sếp";
        } else if (_CVu*1 == 2) {
            return this.ChucVu = "Trưởng Phòng";
        } else if (_CVu*1 == 1) {
            return this.ChucVu = "Nhân Viên";
        }
    }
    this.TongLuong = 0;
    this.TTongLuong = function () {
        this.TongLuong = this.Salary*_CVu;
    }
    this.XepLoai = "";
    this.TXepLoai = function () {
        if (this.TGLam*1 >= 192) {
            return this.XepLoai = "Nhân viên Xuất Sắc"
        }
        if (this.TGLam*1 >= 176) {
            return this.XepLoai = "Nhân viên Giỏi"
        }
        if (this.TGLam*1 >= 160) {
            return this.XepLoai = "Nhân viên Khá"
        }
        if (this.TGLam*1 < 160) {
            return this.XepLoai = "Nhân viên Trung Bình"
        }
    }
    this.timKiemSinhVien = function (keyword) {
        var mangTimKiem = [];
        for (var i = 0; i < this.list.length; i++) {
            if (
                this.list[i].tenSV.toLowerCase().indexOf(keyword.toLowerCase()) !==
                -1
            ) {
                mangTimKiem.push(this.list[i]);
            }
        }
        return mangTimKiem;
    };
    
}