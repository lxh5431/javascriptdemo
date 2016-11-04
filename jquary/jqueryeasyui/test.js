//官方平滑树  
function convert(rows) {
    function exists(rows, parentId) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].id == parentId) return true;
        }
        return false;
    }

    var nodes = [];
    // get the top level nodes  
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!exists(rows, row.parentId)) {
            nodes.push({
                id: row.id,
                text: row.name,
                memo: row.memo
            });
        }
    }

    var toDo = [];
    for (var i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    while (toDo.length) {
        var node = toDo.shift(); // the parent node  
        // get the children nodes  
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.parentId == node.id) {
                var child = { id: row.id, text: row.name, memo: row.memo };
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}

function addNewTab(tabname) {
    //创建一个新的窗口，在mainlayout上  
    if (!$("#mainTabs").tabs('getTab', tabname)) {
        $("#mainTabs").tabs('add', {
            title: tabname,
            selected: true,
            closable: true,
            content: "<iframe src='" + 'http://www.baidu.com' + "' style='width:100%;height:100%'  frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='yes' />"
        });
    } else {
        $('#mainTabs').tabs('select', tabname);
    }
}

$(function() {
    $('#mytree').tree({
        url: 'tree_data2.json',
        loadFilter: function(rows) {
            return convert(rows);
        }
    });
    //点击事件  
    $('#mytree').tree({
        onClick: function(node) {
            if ($('#mytree').tree('isLeaf', node.target)) {
                // alert node text property when clicked  
                //alert(node.text);  
                addNewTab(node.text);
            }

        }
    });
});