// define colours for easy reference
#define LED_R {1,0,0}
#define LED_G {0,1,0}
#define LED_B {0,0,1}
#define LED_C {0,1,1}
#define LED_M {1,0,1}
#define LED_Y {1,1,0}
#define LED_W {1,1,1}
#define LED_X {0,0,0}

const int NUMROWS = 7;
const int NUMCOLS_NORM = 5;
const int NUMCOLS_INV = 2;

struct {
  int colours_norm[7][5][3];
  int colours_inv[7][2][3];
} colourMatrix;

//pin assignments
const int commonPins_norm[NUMROWS] = {42,40,38,36,30,34,32};
const int ledPins_norm[NUMCOLS_NORM][3] = {{47,44,45},{2,3,4},{5,6,7},{8,9,10},{11,12,13}};

const int commonPins_inv[NUMROWS] = {43,41,39,31,33,35,37};
const int ledPins_inv[NUMCOLS_INV][3] = {{A0,A1,A2},{A8,A9,A10}};

void pinSetup();
void getColours();
void displayGrid();

void setup() {
  Serial.begin(9600);

  pinSetup();
  getColours();
}

void loop() {
  displayGrid();
  
}


void displayGrid() {
  for (int row = 0; row < NUMROWS; row++) {
    // go to next row of normal grid (common-anode)
    digitalWrite(commonPins_norm[(row-1) % (NUMROWS-1)], HIGH);
    for (int col = 0; col < NUMCOLS_NORM; col++) {
      digitalWrite(ledPins_norm[col][0], colourMatrix.colours_norm[row][col][0]);
      digitalWrite(ledPins_norm[col][1], colourMatrix.colours_norm[row][col][1]);
      digitalWrite(ledPins_norm[col][2], colourMatrix.colours_norm[row][col][2]);
    }
    digitalWrite(commonPins_norm[row], LOW);

    // go to next row of inverted grid (common-cathode)
    digitalWrite(commonPins_inv[(row-1) % (NUMROWS-1)], LOW);
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
}

void getColours() {
  //int colourArray[7][7][3] = {{LED_R,LED_G,LED_B,LED_C,LED_M,LED_Y,LED_W},{LED_G,LED_B,LED_C,LED_M,LED_Y,LED_W,LED_R},{LED_B,LED_C,LED_M,LED_Y,LED_W,LED_R,LED_G},{LED_C,LED_M,LED_Y,LED_W,LED_R,LED_G,LED_B},{LED_M,LED_Y,LED_W,LED_R,LED_G,LED_B,LED_C},{LED_Y,LED_W,LED_R,LED_G,LED_B,LED_C,LED_M},{LED_W,LED_X,LED_G,LED_X,LED_C,LED_X,LED_Y}};
  
  
  for (int i = 0; i < NUMROWS; i++) {
    for (int j = 0; j < NUMCOLS_NORM; j++) {
//      colourMatrix.colours_norm[i][j][0] = colourArray[i][j][0];
//      colourMatrix.colours_norm[i][j][1] = colourArray[i][j][1];
//      colourMatrix.colours_norm[i][j][2] = colourArray[i][j][2];
      colourMatrix.colours_norm[i][j][0] = 0;
      colourMatrix.colours_norm[i][j][1] = 0;
      colourMatrix.colours_norm[i][j][2] = 1;
    }
    for (int j = 0; j < NUMCOLS_INV; j++) {
//      colourMatrix.colours_inv[i][j][0] = (int) !((bool) colourArray[i][NUMCOLS_NORM+j][0]);
//      colourMatrix.colours_inv[i][j][1] = (int) !((bool) colourArray[i][NUMCOLS_NORM+j][1]);
//      colourMatrix.colours_inv[i][j][2] = (int) !((bool) colourArray[i][NUMCOLS_NORM+j][2]);
      colourMatrix.colours_inv[i][j][0] = 1;
      colourMatrix.colours_inv[i][j][1] = 1;
      colourMatrix.colours_inv[i][j][2] = 0;
    }
  }
}
