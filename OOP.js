// Enums and Constants

const VehicleType = function() {
  return {
    car: 1,
    truck: 2,
    electric: 3,
    van: 4,
    motorcycle: 5
  };
};

const ParkingSpotType = function() {
  return {
    handicapped: 1,
    compact: 2,
    large: 3,
    motorcycle: 4,
    electric: 5
  };
};

const AccountStatus = function() {
  return {
    active: 1,
    blocked: 2,
    banned: 3,
    compromised: 4,
    archived: 5,
    unknown: 6
  };
};

const ParkingTicketStatus = function() {
  return {
    active: 1,
    paid: 2,
    lost: 3
  };
};

const Address = function(street, city, state, zip, country) {
  return {
    street,
    city,
    state,
    zip,
    country
  };
};

const Person = function(name, address, email, phone) {
  return {
    name,
    address,
    email,
    phone
  };
};

// Account, Admin, and Parking Attendant

class Account {
  constructor(username, password, person, status = AccountStatus().active) {
    this.username = username;
    this.password = password;
    this.person = person;
    this.status = status;
  }
  resetPassword() {
    null;
  }
}

class Admin extends Account {
  constructor(username, password, person, status = AccountStatus().active) {
    super(username, password, person, status);
  }
  addParkingFloor(floor) {
    null;
  }
  addParkingSpot(floorName, spot) {
    null;
  }
  addParkingDisplayBoard(floorName, displayBoard) {
    null;
  }
  addCustomerInfoPanel(floorName, infoPanel) {
    null;
  }
  addEntrancePanel(entrancePanel) {
    null;
  }
  addExitPanel(exitPanel) {
    null;
  }
}

class ParkingAttendant extends Account {
  constructor(username, password, person, status = AccountStatus().active) {
    super(username, password, person, status);
  }
  processTicket(ticketNumber) {
    null;
  }
}

class ParkingSpot {
  constructor(number, parkingSpotType) {
    this.number = number;
    this.free = true;
    this.vehicle = null;
    this.parkingSpotType = parkingSpotType;
  }
  isFree() {
    return this.free;
  }
  assignVehicle(vehicle) {
    this.vehicle = vehicle;
    this.free = false;
  }
  removeVehicle(vehicle) {
    this.vehicle = null;
    this.free = true;
  }
  getType() {
    return this.parkingSpotType;
  }
  getNumber() {
    return this.number;
  }
  getVehicle() {
    return this.vehicle;
  }
}

class HandicappedSpot extends ParkingSpot {
  constructor(number) {
    super(number, ParkingSpotType().handicapped);
  }
}

class CompactSpot extends ParkingSpot {
  constructor(number) {
    super(number, ParkingSpotType().compact);
  }
}

class LargeSpot extends ParkingSpot {
  constructor(number) {
    super(number, ParkingSpotType().large);
  }
}

class MotorcycleSpot extends ParkingSpot {
  constructor(number) {
    super(number, ParkingSpotType().motorcycle);
  }
}

class ElectricSpot extends ParkingSpot {
  constructor(number) {
    super(number, ParkingSpotType().electric);
  }
}

class Vehicle {
  constructor(licenseNumber, type, ticket = null) {
    this.licenseNumber = licenseNumber;
    this.type = type;
    this.ticket = ticket;
  }
  assignTicket(ticket) {
    this.ticket = ticket;
  }
  getType() {
    return this.type;
  }
  getLicenseNumber() {
    return this.licenseNumber;
  }
  getTicket() {
    return this.ticket;
  }
}

class Car extends Vehicle {
  constructor(licenseNumber, ticket = null) {
    super(licenseNumber, VehicleType().car, ticket);
  }
}

class Van extends Vehicle {
  constructor(licenseNumber, ticket = null) {
    super(licenseNumber, VehicleType().van, ticket);
  }
}

class Truck extends Vehicle {
  constructor(licenseNumber, ticket = null) {
    super(licenseNumber, VehicleType().truck, ticket);
  }
}

class ParkingDisplayBoard {
  constructor(id) {
    this.id = id;
  }
}

class ParkingFloor {
  constructor(name) {
    this.name = name;
    this.handicappedSpots = new Map();
    this.compactSpots = new Map();
    this.largeSpots = new Map();
    this.motorcycleSpots = new Map();
    this.electricSpots = new Map();
    this.infoPanels = new Map();
    this.displayBoard = new ParkingDisplayBoard();
  }
  addParkingSpot(spot) {
    switch (spot.getType()) {
      case ParkingSpotType().handicapped:
        this.handicappedSpots.set(spot.getNumber(), spot);
        break;
      case ParkingSpotType().compact:
        this.compactSpots.set(spot.getNumber(), spot);
        break;
      case ParkingSpotType().large:
        this.largeSpots.set(spot.getNumber(), spot);
        break;
      case ParkingSpotType().motorcycle:
        this.motorcycleSpots.set(spot.getNumber(), spot);
        break;
      case ParkingSpotType().electric:
        this.electricSpots.set(spot.getNumber(), spot);
        break;
      default:
        console.log('Wrong parking spot type!');
    }
  }
  assignVehicleSpot(vehicle, spot) {
    spot.assignVehicle(vehicle);

    switch (spot.getType()) {
      case ParkingSpotType().handicapped:
        this.updateDisplayForHandicapped(spot);
        break;
      case ParkingSpotType().compact:
        this.updateDisplayForCompact(spot);
        break;
      case ParkingSpotType().large:
        this.updateDisplayForLarge(spot);
        break;
      case ParkingSpotType().motorcycle:
        this.updateDisplayForMotorcycle(spot);
        break;
      case ParkingSpotType().electric:
        this.updateDisplayForElectric(spot);
        break;
      default:
        console.log('Wrong parking spot type!');
    }
  }
  updateDisplayBoardForHandicapped(spot) {
    if (this.displayBoard.getHandicappedFreeSpot().getNumber() === spot.getNumber()) {
      for (let [number, spot] of this.handicappedSpots) {
        if (spot.isFree()) {
          this.displayBoard.setHandicappedFreeSpot(spot);
        }
      }

      this.displayBoard.showEmptySpotNumber();
    }
  }
  updateDisplayBoardForCompact(spot) {
    if (this.displayBoard.getCompactFreeSpot().getNumber() === spot.getNumber()) {
      for (let [number, spot] of this.compactSpots) {
        if (spot.isFree()) {
          this.displayBoard.setCompactFreeSpot(spot);
        }
      }

      this.displayBoard.showEmptySpotNumber();
    }
  }
  updateDisplayBoardForLarge(spot) {
    if (this.displayBoard.getLargeFreeSpot().getNumber() === spot.getNumber()) {
      for (let [number, spot] of this.largeSpots) {
        if (spot.isFree()) {
          this.displayBoard.setLargeFreeSpot(spot);
        }
      }

      this.displayBoard.showEmptySpotNumber();
    }
  }
  updateDisplayBoardForMotorcycle(spot) {
    if (this.displayBoard.getMotorcycleFreeSpot().getNumber() === spot.getNumber()) {
      for (let [number, spot] of this.motorcycleSpots) {
        if (spot.isFree()) {
          this.displayBoard.setMotorcycleFreeSpot(spot);
        }
      }

      this.displayBoard.showEmptySpotNumber();
    }
  }
  updateDisplayForElectric(spot) {
    if (this.displayBoard.getElectricFreeSpot().getNumber() === spot.getNumber()) {
      for (let [number, spot] of this.electricSpots) {
        if (spot.isFree()) {
          this.displayBoard.setElectricFreeSpot(spot);
        }
      }

      this.displayBoard.showEmptySpotNumber();
    }
  }
  removeVehicle(spot) {
    spot.removeVehicle();
  }
}

class DisplayBoard {
  constructor(id) {
    this.id = id;
    this.handicappedFreeSpot = null;
    this.compactFreeSpot = null;
    this.largeFreeSpot = null;
    this.motorcycleFreeSpot = null;
    this.electricFreeSpot = null;
  }
  getHandicappedFreeSpot() {
    return this.handicappedFreeSpot;
  }
  setHandicappedFreeSpot(spot) {
    this.handicappedFreeSpot = spot;
  }
  getCompactFreeSpot() {
    return this.compactFreeSpot;
  }
  setCompactFreeSpot(spot) {
    this.compactFreeSpot = spot;
  }
  getLargeFreeSpot() {
    return this.largeFreeSpot;
  }
  setLargeFreeSpot(spot) {
    this.largeFreeSpot = spot;
  }
  getMotorcycleFreeSpot() {
    return this.motorcycleFreeSpot;
  }
  setMotorcycleFreeSpot(spot) {
    this.motorcycleFreeSpot = spot;
  }
  getElectricFreeSpot() {
    return this.electricFreeSpot;
  }
  setElectricFreeSpot(spot) {
    this.electricFreeSpot = spot;
  }
  showEmptySpotNumber() {
    let message = '';

    if (handicappedFreeSpot.isFree()) {
      message += 'Free Handicapped: ' + handicappedFreeSpot.getNumber();
    } else {
      message += 'Handicapped is full';
    }

    message += '\n';

    if (compactFreeSpot.isFree()) {
      message += 'Free Compact: ' + compactFreeSpot.getNumber();
    } else {
      message += 'Compact is full';
    }

    message += '\n';

    if (largeFreeSpot.isFree()) {
      message += 'Free Large: ' + largeFreeSpot.getNumber();
    } else {
      message += 'Large is full';
    }

    message += '\n';

    if (motorcycleFreeSpot.isFree()) {
      message += 'Free Motorcycle: ' + motorcycleFreeSpot.getNumber();
    } else {
      message += 'Motorcycle is full';
    }

    message += '\n';

    if (electricFreeSpot.isFree()) {
      message += 'Free Electric: ' + electricFreeSpot.getNumber();
    } else {
      message += 'Electric is full';
    }

    console.log(message);
  }
}

class ParkingLot {
  constructor(name, address) {
    this.name = name;
    this.address = address;
    this.parkingRate = 0;
    this.compactSpotCount = 0;
    this.largeSpotCount = 0;
    this.motorcycleSpotCount = 0;
    this.electricSpotCount = 0;
    this.maxCompactCount = 0;
    this.maxLargeCount = 0;
    this.maxMotorcycleCount = 0;
    this.maxElectricCount = 0;
    this.entrancePanels = new Map();
    this.exitPanels = new Map();
    this.parkingFloors = new Map();
    this.activeTickets = new Map();
  }
  initializeParkingLot() {
    // will read and update name, address, and parking rate from database
    // will read and update parking floors from database and give us max spots counts
    // will read active tickets from database and update spot counts
    // will read entrance and exit panels from database and update
  }
  getNewTicket(vehicle) {
    if (this.isFull(vehicle.getType())) {
      throw 'Parking Full'!
    }

    let ticket = new ParkingTicket();

    vehicle.assign(ticket);
    this.incrementSpotCount(vehicle.getType());
    this.activeTickets.set(ticket.getTicketNumber(), ticket);

    return ticket;
  }
  isFull(type) {
    if (type === VehicleType().truck || type === VehicleType().van) {
      return this.largeSpotCount >= this.maxLargeCount;
    }
    if (type === VehicleType().car) {
      return (this.compactSpotCount + this.largeSpotCount) >= (this.maxCompactCount + this.maxLargeCount);
    }
    if (type === VehicleType().motorcycle) {
      return this.motorcycleSpotCount >= this.maxMotorcycleCount;
    }

    return (this.compactSpotCount + this.largeSpotCount + this.electricSpotCount) >= (this.maxCompactCount + this.maxLargeCount + this.maxElectricCount);
  }
  incrementSpotCount(type) {
    if (type === VehicleType().truck || type === VehicleType().van) {
      this.largeSpotCount++;
    } else if (type === VehicleType().motorcycle) {
      this.motorcycleSpotCount++;
    } else if (type === VehicleType().car) {
      if (this.compactSpotCount < this.maxCompactCount) {
        this.compactSpotCount++;
      } else {
        this.largeSpotCount++;
      }
    } else {
      if (this.electricSpotCount < this.maxElectricCount) {
        this.electricSpotCount++;
      } else if (this.compactSpotCount < this.maxCompactCount) {
        this.compactSpotCount++;
      } else {
        this.largeSpotCount++;
      }
    }
  }
}