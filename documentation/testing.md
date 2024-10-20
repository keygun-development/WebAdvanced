# Testing

> Place your test plan, test report and traceability matrix here

## Traceability matrix

### Functional

The table below shows an overview of which test covers which functional requirements

| Test | F1: Gebruikersregistratie | F2: Inloggen | F3: Bieden op Veiling | F4: Inzien van Biedingen | F5: Veiling Creëren (Admin) | F6: Veiling Bewerken (Admin) | F7: Veiling Verwijderen (Admin) | F8: Veilingen Filteren | F9: Inzien van Andere Veilingen | F10: Inzien van Eigen Veilingen |
|:----:|:--------------------------:|:------------:|:----------------------:|:-------------------------:|:------------------------------:|:------------------------------:|:-------------------------------:|:---------------------:|:---------------------------:|:-----------------------------:|
|  T1  |            X               |              |                        |                           |                                |                                |                                 |                       |                             |                               |
|  T2  |            X               |      X       |                        |                           |                                |                                |                                 |                       |                             |                               |
|  T3  |                            |              |          X             |                           |                                |                                |                                 |                       |                             |                               |
|  T4  |                            |              |                        |             X             |                                |                                |                                 |                       |                             |                               |
|  T5  |                            |              |                        |                           |               X                |                                |                                 |                       |                             |                               |
|  T6  |                            |              |                        |                           |                                |                X               |                                 |                       |                             |                               |
|  T7  |                            |              |                        |                           |                                |                                |              X                  |                       |                             |                               |
|  T8  |                            |              |                        |                           |                                |                                |                                 |           X           |                             |                               |
|  T9  |                            |              |                        |                           |                                |                                |                                 |                       |            X                |                               |
| T10  |                            |              |                        |                           |                                |                                |                                 |                       |                             |              X                |


### Non funtional

The table below shows an overview of which test covers which non-functional requirements

| Test | NF1: Prestaties | NF2: Beveiliging | NF3: Gebruiksvriendelijkheid | NF4: Cross-Browser Compatibiliteit | NF5: Mobiele Responsiviteit |
|:----:|:----------------:|:----------------:|:---------------------------:|:----------------------------------:|:---------------------------:|
|  T1  |         X        |       X          |            X                |                                    |                             |
|  T2  |         X        |       X          |            X                |                                    |                             |
|  T3  |         X        |                    |                             |                                    |                             |
|  T4  |         X        |                    |                             |                                    |                             |
|  T5  |         X        |       X          |                             |                                    |                             |
|  T6  |         X        |                    |                             |                                    |                             |
|  T7  |         X        |                    |                            |                                    |                             |
|  T8  |         X        |                    |                             |                                    |                             |
|  T9  |         X        |                    |                             |                                    |                             |
| T10  |         X        |                    |                             |                                    |                             |

## Test plan
## Testplan voor Gameveilingen.nl

### 1. Inleiding
- **Doel:** Een overzicht geven van de teststrategie voor de site om functionaliteit, prestaties en beveiliging te waarborgen voordat deze wordt vrijgegeven.
- **Projectoverzicht:** Een veilingsite waar gamers zich kunnen registreren, bieden op gameveilingen en hun biedingen kunnen beheren. Adminfunctionaliteiten omvatten het beheren van veilingen.

### 2. Testdoelstellingen
- Validatie van de kernfunctionaliteiten zoals gebruikersregistratie, biedingen, veilingsbeheer en filtering.
- Zorgen dat de endpoints correct functioneren en de verwachte responses teruggeven.
- Identificeren van eventuele bruikbaarheid- of prestatieproblemen.

### 3. Omvang
- Gebruikersregistratie en inloggen
- Veilingcreatie, -bewerking en -verwijdering door beheerders
- Bieden op veilingen
- Inzien van biedingen en veilingdetails door bieders
- Filteren van veilingen op console, genre en producent
- Functionaliteit en responsvalidatie van de API

### 4. Teststrategie
- **Soorten Tests:**
    - **Functionele Tests:**
        - Validatie van frontendinteracties (filters, zoekopdrachten en weergave van veilingitems).
        - Verificatie van responses voor GET, POST, PUT en DELETE verzoeken.
    - **Niet-Functionele Tests:**
        - **Beveiliging Testing:** Controleren op kwetsbaarheden in gebruikersauthenticatie en gegevensverwerking.
        - **Gebruiksvelijkheid Testing:** Beoordelen van de gebruikersinterface en algehele gebruikerservaring.
    - **Regressietests:** Opnieuw testen van bestaande functies na wijzigingen of bugfixes.

### 5. Testomgeving
- Frontend: Laatste versies van browsers voor het testen van de site.
- Backend: Node.js en Express.


## Test report
## Testrapport voor Gameveilingen

### 1. Overzicht
- **Projectnaam:** Gameveilingen

### 2. Testsamenvatting
- **Totaal Aantal Geplande Tests:** 10
- **Totaal Aantal Uitgevoerde Tests:** 10
- **Totaal Geslaagd:** 10

### 3. Gedetailleerde Testresultaten

| Test ID | Beschrijving                      | Status   | Opmerkingen                    |
|---------|-----------------------------------|----------|--------------------------------|
| T1      | Gebruikersregistratie             | Geslaagd |                                |
| T2      | Inloggen                          | Geslaagd |                                |
| T3      | Bieden op Veiling                 | Geslaagd |      |
| T4      | Inzien van Biedingen              | Geslaagd |                                |
| T5      | Veiling Creëren (Admin)           | Geslaagd |                                |
| T6      | Veiling Bewerken (Admin)          | Geslaagd |                                |
| T7      | Veiling Verwijderen (Admin)       | Geslaagd |      |
| T8      | Veilingen Filteren                | Geslaagd | Filterfunctionaliteit werkt.   |
| T9      | Inzien van Andere Veilingen        | Geslaagd |                                |
| T10     | Inzien van Eigen Veilingen        | Geslaagd |                                |

### 4. Conclusie
- De applicatie voldoet aan de functionele en niet-functionele testen die ik heb uitgevoerd.
