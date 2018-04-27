import locale

def rupiah_format(angka, with_prefix=False, desimal=0):
    locale.setlocale(locale.LC_NUMERIC, 'IND')
    rupiah = locale.format("%.*f", (desimal, float(angka)), True)
    if with_prefix:
        return "Rp. {}".format(rupiah)
    return rupiah