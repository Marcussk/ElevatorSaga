{
    init: function(elevators, floors) {
        // elevator indexes
        ready_elevators = []
        // numbers of floors that were requested but no elevators were present
        missed_calls = []

        var log = function() {
            console.log(Array.prototype.slice.call(arguments));
        };

        var callElevator = function(floorNum) {
            if(ready_elevators.length) {
                var elevator_index = 0;
                var elevator = elevators[ready_elevators[elevator_index]];
                elevator.status = "moving";
                elevator.goToFloor(floorNum);
                // remove elevator from ready elevators
                ready_elevators.splice(elevator_index, 1);
            }
            else {
                missed_calls.push(floorNum);
            }
        }

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
                        this.status = "loaded";
                    });

                    // Whenever the elevator is idle (has no more queued destinations) ...
                    elevator.on("idle", function() {
                        elevator.goToFloor(0);
                        this.status = "idle";
                        ready_elevators.push(elevator.id);
                    }); 
                }
            )(elevators[i]);
        }
        _.each(floors, function(floor) {
            floor.on("up_button_pressed", function() {
                callElevator(floor.floorNum());
            })
            floor.on("down_button_pressed", function() {
                callElevator(floor.floorNum());
            })
        })
    },    
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}