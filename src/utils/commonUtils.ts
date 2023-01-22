export const remove_spaces = (originalName : string) => {
    let text = '';
    text = originalName.replace(/ /g, "-");
    return text;
}

export const get_current_time = () => {
    return Math.round((new Date()).getTime() / 1000);
}

export const extract_file_name = (originalName : string) => {
    let text = '';
    text = originalName.split('.')[0];

    return text;
}