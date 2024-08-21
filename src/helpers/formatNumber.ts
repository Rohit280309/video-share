export const formatNumber = (number: any) => {
    let shortForm = "";
    let shortNumber: any;
    let view: any = number.toString();
    let length = view.length;

    if (length >= 4 && length <= 6) {
        shortForm = "K";
    }
    else if (length >= 7 && length <= 9) {
        shortForm = "M";
    }
    else if (length >= 10) {
        shortForm = "B";
    }

    length <= 4 ?
        shortNumber = view.split("").slice(0, 2).join(".") :
        length == 5 ?
            shortNumber = view.split("").slice(0, 2).join("") + "." + view.split("").slice(3, 4) :
            length == 6 ?
                shortNumber = view.split("").slice(0, 3).join("") + "." + view.split("").slice(4, 5) :
                length == 7 ?
                    shortNumber = view.split("").slice(0, 2).join(".") :
                    length == 8 ?
                        shortNumber = view.split("").slice(0, 2).join("") + "." + view.split("").slice(3, 4) :
                        length == 9 ?
                            shortNumber = view.split("").slice(0, 3).join("") + "." + view.split("").slice(4, 5) :
                            length == 10 ?
                                shortNumber = view.split("").slice(0, 2).join(".") :
                                null

    return [shortNumber, shortForm];

}