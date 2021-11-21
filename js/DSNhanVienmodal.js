function DSNhanVien() {
    this.list = [];
    this.ThemNV = function(NV) {
        this.list.push(NV)
    }
    this.timViTri = function (TaiK) {
        var index = -1;
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].TaiKhoan === TaiK) {
                index = i;
                break;
            }
        }
        return index;
    };

    this.XoaNV = function (TaiKhoan) {
        var index = this.timViTri(TaiKhoan);

        if (index !== -1) {
            this.list.splice(index, 1);
        }
    };

    this.SuaNV = function (TaiKhoan) {
        var index = this.timViTri(TaiKhoan);

        if (index !== -1) {
            return this.list[index];
        }

        return null;
    };

    this.CapNhapNV = function (nhanvien) {
        var index = this.timViTri(nhanvien.TaiKhoan);

        if (index !== -1) {
            this.list[index] = nhanvien;
        }
    };
    this.timKiemNV = function (keyword) {
        var mangTimKiem = [];
        for (var i = 0; i < this.list.length; i++) {
            if (
                this.list[i].XepLoai.toLowerCase().indexOf(keyword.toLowerCase()) !==
                -1
            ) {
                mangTimKiem.push(this.list[i]);
            }
        }
        return mangTimKiem;
    };
}
