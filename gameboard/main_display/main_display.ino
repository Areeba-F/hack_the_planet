// define colours for easy reference
#define LED_R {1,0,0}
#define LED_G {0,1,0}
#define LED_B {0,0,1}
#define LED_C {0,1,1}
#define LED_M {1,0,1}
#define LED_Y {1,1,0}
#define LED_W {1,1,1}
#define LED_X {0,0,0}

// define modulo for negative numbers
#define MOD(a,b) ((((a)%(b))+(b))%(b))

const int NUMROWS = 7;
const int NUMCOLS_NORM = 5;
const int NUMCOLS_INV = 2;
const int STICK_X_LOW = 312;
const int STICK_X_HIGH = 712;
const int STICK_Y_LOW = 312;
const int STICK_Y_HIGH = 712;

struct {
  bool colours_norm[NUMROWS][NUMCOLS_NORM][3];
  bool colours_inv[NUMROWS][NUMCOLS_INV][3];
} colourMatrix;

bool fullMap[21][21][3];

int stickX;
int stickY;
int xPos = 7;
int yPos = 7;

bool xLock = 0;
bool yLock = 0;

//pin assignments
const int commonPins_norm[NUMROWS] = {42,40,38,36,30,34,32};
const int ledPins_norm[NUMCOLS_NORM][3] = {{47,44,45},{2,3,4},{5,6,7},{8,9,10},{11,12,13}};
const int commonPins_inv[NUMROWS] = {43,41,39,31,33,35,37};
const int ledPins_inv[NUMCOLS_INV][3] = {{A0,A1,A2},{A8,A9,A10}};
const int stickXPin = A14;
const int stickYPin = A13;
const int stick1PwrPin = 53;
const int stick2PwrPin = 52;

void pinSetup();
void getColours();
void displayGrid();
void pollStick();
void moveMapView(int, int);
void updateMap();

void setup() {
  Serial.begin(9600);

  pinSetup();
  TEST_setMap();
  updateColours();
  
}

void loop() {
  if Serial.available() {
    updateMap();
  }
  displayGrid();
  pollStick();
}

void pollStick() {
  stickX = analogRead(stickXPin);
  stickY = analogRead(stickYPin);

  if ((stickX > STICK_X_LOW) && (stickX < STICK_X_HIGH) && (stickY > STICK_Y_LOW) && (stickY < STICK_Y_HIGH)) {
    xLock = 0;
    yLock = 0;
  }

  if (xLock == 0) {
    if (stickX > STICK_X_HIGH) {
      xLock = 1;
      moveMapView(-1, 0);
    } else if (stickX < STICK_X_LOW) {
      xLock = 1;
      moveMapView(1, 0);
    }
  }

  if (yLock == 0) {
    if (stickY > STICK_Y_HIGH) {
      yLock = 1;
      moveMapView(0, 1);
    } else if (stickY < STICK_Y_LOW) {
      yLock = 1;
      moveMapView(0, -1);
    }
  }

}


void displayGrid() {
  for (int row = 0; row < NUMROWS; row++) {
    // go to next row of normal grid (common-anode)
    digitalWrite(commonPins_norm[MOD(row-1,NUMROWS)], HIGH);
    for (int col = 0; col < NUMCOLS_NORM; col++) {
      digitalWrite(ledPins_norm[col][0], colourMatrix.colours_norm[row][col][0]);
      digitalWrite(ledPins_norm[col][1], colourMatrix.colours_norm[row][col][1]);
      digitalWrite(ledPins_norm[col][2], colourMatrix.colours_norm[row][col][2]);
    }
    digitalWrite(commonPins_norm[row], LOW);

    // go to next row of inverted grid (common-cathode)
    digitalWrite(commonPins_inv[MOD(row-1,NUMROWS)], LOW);
    for (int col = 0; col < NUMCOLS_INV; col++) {
      digitalWrite(ledPins_inv[col][0], colourMatrix.colours_inv[row][col][0]);
      digitalWrite(ledPins_inv[col][1], colourMatrix.colours_inv[row][col][1]);
      digitalWrite(ledPins_inv[col][2], colourMatrix.colours_inv[row][col][2]);
    }
    digitalWrite(commonPins_inv[row], HIGH);
    delay(1);
  }
}


void pinSetup() {
  // set up pins
  for (int i = 0; i < NUMROWS; i++) {
    pinMode(commonPins_norm[i], OUTPUT);
    digitalWrite(commonPins_norm[i], HIGH);
    pinMode(commonPins_inv[i], OUTPUT);
    digitalWrite(commonPins_inv[i], LOW);
  }
  
  for (int i = 0; i < NUMCOLS_NORM; i++) {
    pinMode(ledPins_norm[i][0], OUTPUT);
    pinMode(ledPins_norm[i][1], OUTPUT);
    pinMode(ledPins_norm[i][2], OUTPUT);
    digitalWrite(ledPins_norm[i][0], LOW);
    digitalWrite(ledPins_norm[i][1], LOW);
    digitalWrite(ledPins_norm[i][2], LOW);
  }

  for (int i = 0; i < NUMCOLS_INV; i++) {
    pinMode(ledPins_inv[i][0], OUTPUT);
    pinMode(ledPins_inv[i][1], OUTPUT);
    pinMode(ledPins_inv[i][2], OUTPUT);
    digitalWrite(ledPins_inv[i][0], HIGH);
    digitalWrite(ledPins_inv[i][1], HIGH);
    digitalWrite(ledPins_inv[i][2], HIGH);
  }

  pinMode(stick1PwrPin, OUTPUT);
  digitalWrite(stick1PwrPin, HIGH);
  pinMode(stick2PwrPin, OUTPUT);
  digitalWrite(stick2PwrPin, HIGH);
  pinMode(stickXPin, INPUT);
  pinMode(stickYPin, INPUT);
}

void moveMapView(int xMovement, int yMovement) {
  xPos += xMovement;
  yPos += yMovement;
  
  if (xPos < 0) {
    xPos = 0;
  } else if (xPos > 14) {
    xPos = 14;
  }
  if (yPos < 0) {
    yPos = 0;
  } else if (yPos > 14) {
    yPos = 14;
  }
  updateColours();
}

void updateColours() {
  
  for (int i = 0; i < NUMROWS; i++) {
    for (int j = 0; j < NUMCOLS_NORM; j++) {
      colourMatrix.colours_norm[i][j][0] = fullMap[yPos+i][xPos+j][0];
      colourMatrix.colours_norm[i][j][1] = fullMap[yPos+i][xPos+j][1];
      colourMatrix.colours_norm[i][j][2] = fullMap[yPos+i][xPos+j][2];

    }
    for (int j = 0; j < NUMCOLS_INV; j++) {
      colourMatrix.colours_inv[i][j][0] = !fullMap[yPos+i][xPos+NUMCOLS_NORM+j][0];
      colourMatrix.colours_inv[i][j][1] = !fullMap[yPos+i][xPos+NUMCOLS_NORM+j][1];
      colourMatrix.colours_inv[i][j][2] = !fullMap[yPos+i][xPos+NUMCOLS_NORM+j][2];
    }
  }
}

void updateMap() {
  Serial.println("Ah, something new! Let me take a look...");

  char receivedData[21*21*3+1];
  
  int bytesReceived = Serial.readBytesUntil('\n',receivedData, 21*21*3+1);

  if ((bytesReceived != 21*21*3) ) {
    Serial.println("Hmm... That doesn't look like a complete map! I'm afraid I don't deal in map fragments; you'd best double-check to make sure you've got the whole thing.");
    Serial.flush();
    drainSerial();
    return;
  } else {
    for (int row = 0; row < 21; row++) {
      for (int col = 0; col < 21; col++) {
        fullMap[row][col][0] = (bool) receivedData[row*21*3+col*3] - 30;
        fullMap[row][col][1] = (bool) receivedData[row*21*3+col*3+1] - 30;
        fullMap[row][col][2] = (bool) receivedData[row*21*3+col*3+2] - 30;
      }
    }
    Serial.println("Splendid, a new map! I'll work my magic to bring it to life.");
    Serial.flush();
    drainSerial();
  }
}

void drainSerial() {
  while (Serial.available() > 0) {
    Serial.readBytes((char*) NULL, 8);
  }
}

}

void TEST_setMap() {
  int colours[3][3] = {{1,0,0},{0,1,0},{0,0,1}};
  
  for (int i = 0; i < 21*21; i++) {
    fullMap[(int) floor(i/21)][i%21][0] = colours[i%3][0];
    fullMap[(int) floor(i/21)][i%21][1] = colours[i%3][1];
    fullMap[(int) floor(i/21)][i%21][2] = colours[i%3][2];
  }
}
