
const int NUMROWS = 7;
const int NUMPOSCOLS = 2;
const int NUMNEGCOLS = 1;

// pin assignments
const int commonNeg[NUMROWS] = {53, 52, 51, 50, 49, 48, 47};
const int ledR_P[NUMPOSCOLS] = {2,5};
const int ledG_P[NUMPOSCOLS] = {3,6};
const int ledB_P[NUMPOSCOLS] = {4,7};

const int commonPos[NUMROWS] = {46, 45, 44, 43, 42, 41, 40};
const int ledR_N[NUMNEGCOLS] = {8};
const int ledG_N[NUMNEGCOLS] = {9};
const int ledB_N[NUMNEGCOLS] = {10};

void setup() {
  Serial.begin(9600);

  // set pin modes
  for (int i = 0; i < NUMROWS; i++) {
    pinMode(commonNeg[i], OUTPUT);
    digitalWrite(commonNeg[i], HIGH);
    pinMode(commonPos[i], OUTPUT);
    digitalWrite(commonPos[i], LOW);
  }
  for (int i = 0; i < NUMPOSCOLS; i++) {
    pinMode(ledR_P[i], OUTPUT);
    pinMode(ledG_P[i], OUTPUT);
    pinMode(ledB_P[i], OUTPUT);
    digitalWrite(ledR_P[i], LOW);
    digitalWrite(ledG_P[i], LOW);
    digitalWrite(ledB_P[i], LOW);
  }

  for (int i = 0; i < NUMNEGCOLS; i++) {
    pinMode(ledR_N[i], OUTPUT);
    pinMode(ledG_N[i], OUTPUT);
    pinMode(ledB_N[i], OUTPUT);
    digitalWrite(ledR_N[i], HIGH);
    digitalWrite(ledG_N[i], HIGH);
    digitalWrite(ledB_N[i], HIGH);
  }
 
}

void loop() {
  for (int i = 0; i < NUMROWS; i++) {
    digitalWrite(commonNeg[(i-1) % (NUMROWS-1)], HIGH);
    digitalWrite(commonPos[(i-1) % (NUMROWS - 1)], LOW);
    for (int j = 0; j < NUMPOSCOLS; j++) {
      digitalWrite(ledR_P[j], mapPosColours[j][i][0]);
      digitalWrite(ledG_P[j], mapPosColours[j][i][1]);
      digitalWrite(ledB_P[j], mapPosColours[j][i][2]);
    }
    for (int j = 0; j < NUMNEGCOLS; j++) {
      digitalWrite(ledR_N[j], ((int) !((bool) mapNegColours[j][i][0])));
      digitalWrite(ledG_N[j], ((int) !((bool) mapNegColours[j][i][1])));
      digitalWrite(ledB_N[j], ((int) !((bool) mapNegColours[j][i][2])));
    }
    digitalWrite(commonNeg[i], LOW);
    digitalWrite(commonPos[i], HIGH);
    delay(2);
  }


}
