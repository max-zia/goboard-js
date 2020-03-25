/**
 * Stores hash table of all groups of stones on Board as 
 * {groupId1: [[co1, co2, co3], colour], groupId2: [[co3, co4], colour]} 
 * 
 * A group is a set of same-coloured stones that is connected by touching at
 * any of the 4 liberty points surrounding a stone.
 * 
 * GroupTable has methods to create new groups, addEntry(); edit groups, 
 * addToGroup(); and delete groups, removeGroup() in this.table.     
 */

class GroupTable {

    constructor() {
        this.table = {};
        this.total = 0;
        this.groupId = 0;
    }

    /** 
     * Add a new group to the group table.
     * e.g. addEntry("white", "A9")
     */
    addEntry(colour, co) {
        this.table[`group-${this.groupId}`] = [[co], colour, this.total];
        this.total++;
        this.groupId++;
    }

    /**
     * Remove an existing group from the group table.
     */
    deleteEntry(groupId) {
        if (Object.keys(this.table).includes(groupId)) {
            delete this.table[groupId];
            this.total--;
        }
    }

    /**
     * Add a coordinate not in a group (the last placed stone, co1) to the
     * 1D array that a specified coordinate is an element of (co2).
     * e.g. addToGroup("A9", "A8");
     *      Here, A9 is the last placed stone (and so not in a group), 
     *      and A8 is a same-coloured stone on the board that A9 is touching.
     */
    addToGroup(co1, co2) {
        var array = Object.values(this.table); 
        for (let i = 0; i < array.length; i++) {
            if (array[i][0].includes(co2)) {
                array[i][0].push(co1);
            }
        }
    }

    removefromGroup(co) {
        console.log(co);
        var group = this.getGroupOf(co);
        var coords = this.table[group][0];
        if (coords.length == 1) {
            this.deleteEntry(group);
        } else {
            var i = coords.indexOf(co);
            coords.splice(i, 1);
        }
    }

    /**
     * Return the ID of group that this coordinate is a member of
     */
    getGroupOf(co) {
        var x = this.table;
        var mainKey = "";

        Object.keys(x).forEach(function(key) {
            if ((countOf(x[key][0], co)) > 0) {
                mainKey = key;
            }
        });

        return mainKey;
    }

    /**
     * Return a copy of the class instance.
     */
    copy() {
        var copied = Object.assign(
            Object.create(
                Object.getPrototypeOf(this)
            ), 
            this
        );
    
        // Add a copy of the instance variables
        copied.table = this.copyTable(copied.table);
    
        return copied;
    }

    /**
     * Return a copy of field variable table.
     */
    copyTable() {
        var x = this.table;
        var copied = {};
        Object.keys(x).forEach(function(key) {
            copied[key] = [];
            copied[key][0] = x[key][0].slice(0);
            copied[key][1] = x[key][1];
            copied[key][2] = x[key][2];
        });
        return copied;
    }
    
}
