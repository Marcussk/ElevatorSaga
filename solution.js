{
    init: function(elevators, floors) {


        // Setup each elevator
        for (var i = 0; i < elevators.length; i++) {
            elevators[i].id = i;
            (
                function(elevator) {
                    elevator.status = "idle";

                    //elevator.on("passing_floor", function(floorNum, direction) {

                    // passenger inside elevator pressed button
                    elevator.on("floor_button_pressed", function(floorNum) {
                        elevator.goToFloor(floorNum);
                    });

                    // Whenever the elevator is idle (has no more queued destinations) ...
                    elevator.on("idle", function() {
                        elevator.goToFloor(0);
                        //    this.status = "idle";
                    }); 
                }
            )(elevators[i]);
        }
    },    
        // _.each(floors, function(floor) {    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}