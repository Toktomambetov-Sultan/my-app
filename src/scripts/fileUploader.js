export const files = [];
const itemTemplate = '<li class="list-group-item d-flex align-items-center justify-content-between"><span></span><img src="" alt=""><button type="button" class="btn btn-danger">remove</button></li>';
const list = $("#file-list-group");
export  function run (){
    function update() {
        list.empty();
        files.forEach(file => {
            const item = $(itemTemplate);
            item.find("span").text(file.name);
            item.find("img").attr("src", file.path).css({
                width: "400px",
                height: "auto",
            });
            list.append(item);
        })
        list.find("button").each((index, btn) => {
            $(btn).on("click", () => {
                files.splice(index, 1);
                update();
            })

        })
    }
    $("#file-upload").on("change", (event) => {
        if (Object.values(event.target.files).reduce((count, elem) => {
            if (!(elem.type.indexOf("image/jpeg") + 1 || elem.type.indexOf("image/png") + 1)) {
                count = false;
            }
            return count
        }, true)) {
            files.push(
                ...Object.values(event.target.files)
            );
        }
        update();

    })
}