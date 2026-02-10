const CATEGORIES = {
    MICRO: "Microbiology & Contamination",
    POISON: "Food Poisoning",
    TEMP: "Temperature Control",
    HYGIENE: "Personal Hygiene",
    CLEAN: "Cleaning & Sanitation",
    CHECK: "Own-Check (Self-Monitoring)",
    LAW: "Finnish Food Legislation"
};

// Auth levels: "official" = Ruokavirasto model test, "likely" = 3+ sources, "practice" = approved platforms
const QUESTIONS = [
    // ===================== MICROBIOLOGY & CONTAMINATION =====================
    // OFFICIAL (Ruokavirasto model test, March 2025)
    { q: "Vacuum-packaged foodstuffs might contain microbes that cause food poisoning.", a: true, cat: "MICRO", auth: "official", exp: "Some harmful microbes like Listeria monocytogenes and Clostridium botulinum thrive in oxygen-free environments found in vacuum packages." },
    { q: "Deep-frozen berries might contain microbes that cause food poisoning.", a: true, cat: "MICRO", auth: "official", exp: "Deep freezing keeps viruses alive. Frozen berries can carry norovirus and hepatitis A. Must be heated to +90°C for 2+ minutes." },
    { q: "A preservative destroys all microbes in a foodstuff.", a: false, cat: "MICRO", auth: "official", exp: "Preservatives inhibit or slow microbial growth but do NOT destroy all microbes. Salt binds water, reducing growth conditions." },
    { q: "Food poisoning always requires a large number of harmful bacteria.", a: false, cat: "MICRO", auth: "official", exp: "Some food poisonings can be caused by very tiny amounts of bacteria or their toxins. Even a few cells of some pathogens can cause illness." },
    { q: "Cloudiness of liquid in a food product's package during storage is caused by the growth of microbes.", a: true, cat: "MICRO", auth: "official", exp: "Cloudiness, gas formation, and unusual odor indicate microbial growth and spoilage. Such products must not be consumed." },
    { q: "Microbes grow well in cooked rice at room temperature.", a: true, cat: "MICRO", auth: "official", exp: "Cooked rice has high water activity. At room temperature, Bacillus cereus spores germinate and produce toxins. Cool rice rapidly." },
    // LIKELY OFFICIAL
    { q: "You can always tell if food is contaminated by its appearance, smell, or taste.", a: false, cat: "MICRO", auth: "likely", exp: "Many dangerous pathogens (Salmonella, Listeria, E. coli) cause NO detectable changes. Food can look perfectly fine yet be dangerous." },
    { q: "Bacteria can multiply rapidly in food kept at room temperature.", a: true, cat: "MICRO", auth: "likely", exp: "Room temperature (20-37°C) is ideal for bacterial growth. The danger zone is +6°C to +60°C." },
    { q: "Cross-contamination means the transfer of harmful microbes from one food to another or from surfaces to food.", a: true, cat: "MICRO", auth: "likely", exp: "Cross-contamination is a major cause of foodborne illness, especially from raw meat to ready-to-eat foods." },
    { q: "All microbes are harmful to humans.", a: false, cat: "MICRO", auth: "likely", exp: "Many microbes are harmless or even beneficial (yogurt cultures, cheese bacteria, bread yeast). Only pathogenic microbes cause illness." },
    { q: "Spore-forming bacteria like Bacillus cereus can survive boiling temperatures.", a: true, cat: "MICRO", auth: "likely", exp: "Bacterial spores are extremely heat-resistant. They survive at 100°C and germinate when food cools into the danger zone." },
    // PRACTICE
    { q: "Viruses can multiply in food.", a: false, cat: "MICRO", auth: "practice", exp: "Viruses cannot multiply in food — they need living host cells. However, food can transmit viruses to humans." },
    { q: "Microbes need warmth, moisture, nutrients, and time to multiply.", a: true, cat: "MICRO", auth: "practice", exp: "These four conditions are essential for microbial growth. Controlling any of them helps prevent contamination." },
    { q: "Bacteria can double in number every 20 minutes under optimal conditions.", a: true, cat: "MICRO", auth: "practice", exp: "At optimal temperature and conditions, bacteria multiply exponentially, making time control critical." },
    { q: "Mold on the surface of food only affects the visible area.", a: false, cat: "MICRO", auth: "practice", exp: "Mold can produce invisible toxins (mycotoxins) that penetrate deep into the food. Moldy food should be discarded entirely." },
    { q: "Freezing food kills all harmful bacteria.", a: false, cat: "MICRO", auth: "likely", exp: "Freezing STOPS bacterial growth but does NOT kill all bacteria. When food thaws, surviving bacteria resume multiplying." },

    // ===================== FOOD POISONING =====================
    // OFFICIAL
    { q: "Food prepared by heating, but refrigerated too slowly, can cause food poisoning.", a: true, cat: "POISON", auth: "official", exp: "Slow cooling keeps food in the danger zone. B. cereus spores survive cooking and germinate if cooling takes over 4 hours." },
    // LIKELY OFFICIAL
    { q: "Campylobacter from poultry is the most common cause of bacterial food poisoning in Finland.", a: true, cat: "POISON", auth: "likely", exp: "Campylobacter is #1 bacterial cause of foodborne illness in Finland. Often from undercooked poultry and cross-contamination." },
    { q: "The toxin produced by Staphylococcus aureus is destroyed by normal cooking temperatures.", a: false, cat: "POISON", auth: "likely", exp: "S. aureus toxin is heat-stable — it survives boiling. While cooking kills the bacteria, the toxin remains active and causes illness." },
    { q: "Norovirus is destroyed when food is heated at least two minutes at over +90°C.", a: true, cat: "POISON", auth: "likely", exp: "Norovirus requires +90°C for minimum 2 minutes. Especially critical for frozen berries used in smoothies, desserts, etc." },
    { q: "An employee with diarrhea or vomiting should not work with food.", a: true, cat: "POISON", auth: "likely", exp: "Sick employees must be EXCLUDED from food handling immediately. Return only 48 hours after symptoms cease." },
    { q: "A person can spread food poisoning even if they have no symptoms.", a: true, cat: "POISON", auth: "likely", exp: "Asymptomatic carriers (especially of Salmonella) can shed pathogens without feeling ill. Hand hygiene is critical for all." },
    { q: "Listeria monocytogenes can grow at refrigerator temperatures.", a: true, cat: "POISON", auth: "likely", exp: "Listeria is uniquely dangerous because it CAN grow at temperatures as low as 0°C. Serious risk in refrigerated ready-to-eat foods." },
    // PRACTICE
    { q: "Salmonella is destroyed by proper cooking of food.", a: true, cat: "POISON", auth: "practice", exp: "Salmonella is killed at temperatures above +70°C when food is heated thoroughly throughout." },
    { q: "Food poisoning is always caused by bacteria.", a: false, cat: "POISON", auth: "practice", exp: "Food poisoning can be caused by bacteria, viruses (norovirus), parasites, toxins, and chemicals." },
    { q: "Food poisoning symptoms always appear within one hour of eating contaminated food.", a: false, cat: "POISON", auth: "practice", exp: "Incubation periods vary widely: hours (S. aureus toxin) to days (Salmonella) to weeks (Listeria)." },
    { q: "Bacillus cereus can cause food poisoning through rice dishes that have been improperly cooled.", a: true, cat: "POISON", auth: "practice", exp: "Cooked rice left at room temperature allows B. cereus spores to germinate and produce toxins." },

    // ===================== TEMPERATURE CONTROL =====================
    // OFFICIAL
    { q: "Temperature does not affect the reproduction of microbes.", a: false, cat: "TEMP", auth: "official", exp: "Temperature is the MOST critical factor. Microbes reproduce fastest in the danger zone (+6°C to +60°C)." },
    { q: "After proper heating, storing food at +60°C or above during serving prevents microbial growth.", a: true, cat: "TEMP", auth: "official", exp: "Temperatures ≥+60°C prevent bacteria from multiplying. Essential for buffet and hot holding service." },
    // LIKELY OFFICIAL
    { q: "The most dangerous temperature range for food is +6°C to +60°C (the danger zone).", a: true, cat: "TEMP", auth: "likely", exp: "The danger zone is where bacteria multiply fastest. Food must spend as little time as possible in this range." },
    { q: "If food is prepared by heating but served the next day, it must be cooled to +6°C or below within 4 hours.", a: true, cat: "TEMP", auth: "likely", exp: "Rapid cooling from +60°C to +6°C within 4 hours is mandatory. Use shallow containers, ice baths, or blast chillers." },
    { q: "Food should always be cooled to room temperature before placing it in the refrigerator.", a: false, cat: "TEMP", auth: "likely", exp: "Common myth! Waiting keeps food in the danger zone too long. Begin refrigerating promptly — divide into smaller portions." },
    { q: "Warm food portions are allowed to cool to room temperature during transport.", a: false, cat: "TEMP", auth: "likely", exp: "Hot food must be kept at ≥+60°C during transport. Covering alone does not prevent cooling into the danger zone." },
    { q: "Cooked foods must have their temperature measured from the center of the food.", a: true, cat: "TEMP", auth: "likely", exp: "The center is the coldest part during heating. Core temperature must reach the required level throughout." },
    { q: "Frozen food deliveries should be placed in the freezer without delay.", a: true, cat: "TEMP", auth: "likely", exp: "Prompt storage maintains the cold chain. Thawing and refreezing compromises food safety and quality." },
    // PRACTICE
    { q: "Hot food for sale or serving must be maintained at a temperature of at least +60°C.", a: true, cat: "TEMP", auth: "practice", exp: "Keeping hot food at +60°C or above prevents bacterial growth during serving (bain-maries, hot plates)." },
    { q: "The correct storage temperature for perishable food in a refrigerator is +6°C or below.", a: true, cat: "TEMP", auth: "practice", exp: "Standard fridge max is +6°C. Fresh fish and minced meat require 0 to +3°C." },
    { q: "The freezer temperature should be kept below -18°C.", a: true, cat: "TEMP", auth: "practice", exp: "-18°C or below is the standard that effectively stops microbial growth." },
    { q: "Fresh fish should be stored at a temperature of +6°C or below.", a: false, cat: "TEMP", auth: "practice", exp: "Fresh fish requires stricter control: 0 to +3°C, or on melting ice. +6°C is too warm for fish." },
    { q: "You can refreeze food that has been completely thawed, without any safety concerns.", a: false, cat: "TEMP", auth: "practice", exp: "Bacteria may have multiplied during thawing. Refreezing doesn't kill them. Quality also degrades significantly." },
    { q: "Plastic wrap is sufficient to protect warm food at room temperature.", a: false, cat: "TEMP", auth: "practice", exp: "Plastic wrap doesn't prevent bacterial growth. Hot food must be kept at ≥+60°C, not just covered." },
    { q: "The internal temperature of poultry must reach at least +75°C to be safe to serve.", a: true, cat: "TEMP", auth: "practice", exp: "Poultry is a high-risk food. Core temp must reach ≥+75°C to kill Salmonella and Campylobacter." },
    { q: "It is safe to thaw frozen food on the kitchen counter at room temperature.", a: false, cat: "TEMP", auth: "practice", exp: "Thawing at room temperature allows outer layers to enter the danger zone. Thaw in fridge, under cold running water, or in microwave." },

    // ===================== PERSONAL HYGIENE =====================
    // OFFICIAL
    { q: "Good hand hygiene prevents food poisonings.", a: true, cat: "HYGIENE", auth: "official", exp: "Good hand hygiene is crucial in preventing the spread of food poisoning microbes from a food preparer's hands to food." },
    { q: "Pets are allowed in the kitchen of a food premises.", a: false, cat: "HYGIENE", auth: "official", exp: "Pets are NOT allowed in kitchen areas due to hygiene risks. May only be permitted in customer areas with the operator's consent." },
    // LIKELY OFFICIAL
    { q: "An employee with diarrhea or vomiting may continue working if they wear disposable gloves.", a: false, cat: "HYGIENE", auth: "likely", exp: "Sick employees must be EXCLUDED from food handling immediately. Gloves provide NO adequate protection. Return only 48h after symptoms cease." },
    { q: "Food handlers may wear rings and watches while preparing food if they wash their hands frequently.", a: false, cat: "HYGIENE", auth: "likely", exp: "ALL jewelry must be removed. Bacteria accumulate under jewelry and cannot be adequately cleaned regardless of handwashing." },
    { q: "Disposable gloves eliminate the need for handwashing.", a: false, cat: "HYGIENE", auth: "likely", exp: "Hands must be washed BEFORE putting on gloves AND every time gloves are changed. Gloves can harbor and transfer bacteria." },
    { q: "Wounds and cuts on hands must be covered with a waterproof, brightly colored bandage.", a: true, cat: "HYGIENE", auth: "likely", exp: "Blue waterproof bandages are standard — bright color ensures detection if they fall off. Gloves should be worn over them." },
    // PRACTICE
    { q: "Employees can have their meals in the same area where the food is prepared.", a: false, cat: "HYGIENE", auth: "practice", exp: "Eating must take place in a designated break area, not in food preparation zones, to prevent contamination." },
    { q: "Smoking is permitted in food preparation areas during breaks.", a: false, cat: "HYGIENE", auth: "practice", exp: "Smoking is strictly prohibited in ALL food handling areas. Hands must be washed after smoking in designated break areas." },
    { q: "Nail polish and artificial nails are acceptable for food handlers if gloves are worn.", a: false, cat: "HYGIENE", auth: "practice", exp: "Nail polish chips and artificial nails harbor bacteria. Prohibited even with gloves, as gloves can tear." },
    { q: "A head covering is not required when handling food.", a: false, cat: "HYGIENE", auth: "practice", exp: "Head coverings (caps, hair nets) are required to prevent hair and skin particles from falling into food." },
    { q: "Food handlers should wash their hands with soap and water before starting work and after breaks.", a: true, cat: "HYGIENE", auth: "practice", exp: "Proper handwashing is the single most important measure to prevent food contamination." },
    { q: "You should wash your hands after handling raw meat or eggs.", a: true, cat: "HYGIENE", auth: "practice", exp: "Raw meat and eggs carry Salmonella and other pathogens. Hands must be washed immediately after contact." },
    { q: "Food handlers should use clean, dedicated work clothing.", a: true, cat: "HYGIENE", auth: "practice", exp: "Clean work clothes prevent contamination from street clothes. A clean apron and head covering are standard." },
    { q: "It is acceptable to taste food directly from a cooking spoon if you are the chef.", a: false, cat: "HYGIENE", auth: "practice", exp: "You must use a separate clean spoon for tasting each time. 'Double dipping' introduces mouth bacteria into the food." },
    { q: "You should sneeze or cough into your elbow, not your hands, when working with food.", a: true, cat: "HYGIENE", auth: "practice", exp: "Sneezing into hands would contaminate everything touched afterwards. Use your elbow and wash hands immediately." },
    { q: "After a smoking break, a food handler must wash their hands before returning to food preparation.", a: true, cat: "HYGIENE", auth: "practice", exp: "Smoking contaminates hands with bacteria and chemicals. Handwashing after every break is mandatory." },

    // ===================== CLEANING & SANITATION =====================
    // OFFICIAL
    { q: "A food establishment must be cleaned regularly following a cleaning plan, and cleanliness must be monitored continuously.", a: true, cat: "CLEAN", auth: "official", exp: "A written cleaning plan with schedules, methods, and responsibilities is required. Inspectors will check it." },
    // LIKELY OFFICIAL
    { q: "Disinfecting work surfaces does not compensate for regular, careful washing.", a: true, cat: "CLEAN", auth: "likely", exp: "Clean FIRST with detergent, THEN disinfect. Organic matter (grease, food residue) reduces disinfectant effectiveness." },
    { q: "It is safe to use the same cutting board for raw meat and vegetables without washing it in between.", a: false, cat: "CLEAN", auth: "likely", exp: "Major cross-contamination risk. Use separate boards or wash thoroughly between uses. Color-coding recommended." },
    { q: "Dirty dishcloths can spread bacteria to clean surfaces.", a: true, cat: "CLEAN", auth: "likely", exp: "Wet cloths are ideal breeding grounds for bacteria. Change frequently; wash at ≥+60°C. Disposable cloths preferred in professional kitchens." },
    { q: "Cleaning chemicals can be stored alongside food if clearly labeled.", a: false, cat: "CLEAN", auth: "likely", exp: "Chemicals must ALWAYS be stored completely separately from food, in a dedicated locked or separated area, regardless of labeling." },
    // PRACTICE
    { q: "Raw meat should be stored below ready-to-eat foods in the refrigerator.", a: true, cat: "CLEAN", auth: "practice", exp: "Prevents raw meat juices from dripping onto ready-to-eat foods. Fridge order: ready-to-eat (top) → raw meat (bottom)." },
    { q: "Cleaning agents and chemicals should be stored separately from food items.", a: true, cat: "CLEAN", auth: "practice", exp: "Chemicals can contaminate food. They must be stored in designated areas, clearly labeled, away from food." },
    { q: "A clean surface always looks clean to the naked eye.", a: false, cat: "CLEAN", auth: "practice", exp: "Surfaces can look clean but still harbor dangerous bacteria. Proper cleaning procedures and monitoring are essential." },
    { q: "Pests in food premises are not a significant food safety concern if the food is kept covered.", a: false, cat: "CLEAN", auth: "practice", exp: "Pests carry pathogens and contaminate surfaces. Pest control is mandatory for all food premises." },
    { q: "Hot water alone is sufficient for cleaning food contact surfaces.", a: false, cat: "CLEAN", auth: "practice", exp: "Detergent/soap is needed to remove grease and organic matter. Hot water alone leaves invisible residues." },
    { q: "Allergen cross-contamination can occur through shared equipment and surfaces.", a: true, cat: "CLEAN", auth: "practice", exp: "Allergen residues on equipment can transfer to other foods. Equipment must be thoroughly cleaned between uses." },
    { q: "Hand sanitizer (alcohol gel) can fully replace handwashing with soap and water.", a: false, cat: "CLEAN", auth: "practice", exp: "Sanitizer doesn't remove dirt or all pathogens (especially norovirus). Soap-and-water washing always required first." },
    { q: "Dry goods such as flour and sugar should be stored at least 15 cm off the floor.", a: true, cat: "CLEAN", auth: "practice", exp: "Storing off the floor protects from moisture, pests, and contaminants, and allows proper cleaning underneath." },
    { q: "Floors in food preparation areas should not be swept with a dry broom during food preparation.", a: true, cat: "CLEAN", auth: "practice", exp: "Dry sweeping raises dust and bacteria into the air, contaminating food. Wet mopping or vacuum cleaning is preferred." },
    { q: "Using different colored cutting boards for raw meat and ready-to-eat food helps prevent cross-contamination.", a: true, cat: "CLEAN", auth: "practice", exp: "Color-coding prevents mix-ups. Typical: red = raw meat, green = vegetables, blue = fish, yellow = cooked, white = dairy/bread." },

    // ===================== OWN-CHECK (SELF-MONITORING) =====================
    // OFFICIAL
    { q: "All food business operators must carry out own-check (self-monitoring).", a: true, cat: "CHECK", auth: "official", exp: "Own-check is mandatory for ALL food businesses regardless of size. Based on HACCP principles." },
    // LIKELY OFFICIAL
    { q: "Every employee shares responsibility for carrying out the own-check plan.", a: true, cat: "CHECK", auth: "likely", exp: "Not just management's job — every food handler must follow and participate in the own-check plan." },
    { q: "When a health inspector visits, they will check the own-check plan's monitoring logs.", a: true, cat: "CHECK", auth: "likely", exp: "Inspectors verify own-check plans are followed and properly documented. Temperature logs, cleaning records, etc." },
    // PRACTICE
    { q: "Receiving food products is part of the own-check plan.", a: true, cat: "CHECK", auth: "practice", exp: "Checking deliveries (temperature, packaging, expiry dates) upon receipt is a critical own-check point." },
    { q: "An own-check plan only needs to be created when the business starts operating.", a: false, cat: "CHECK", auth: "practice", exp: "Own-check plans must be continuously updated as products, processes, or conditions change." },
    { q: "Temperature records should be kept as part of the own-check documentation.", a: true, cat: "CHECK", auth: "practice", exp: "Regular temperature monitoring and recording of fridges, freezers, and hot food is mandatory." },
    { q: "Own-check is voluntary for small food businesses.", a: false, cat: "CHECK", auth: "practice", exp: "All food businesses, regardless of size, must have and follow an own-check plan under Finnish law." },
    { q: "HACCP stands for Hazard Analysis and Critical Control Points.", a: true, cat: "CHECK", auth: "practice", exp: "HACCP is an internationally recognized system for identifying and controlling food safety hazards." },
    { q: "Corrective actions must be documented when monitoring shows that a critical limit has been exceeded.", a: true, cat: "CHECK", auth: "practice", exp: "When something goes wrong (e.g., fridge temp too high), the action taken must be recorded." },
    { q: "Customer complaints about food should be recorded and investigated as part of own-check.", a: true, cat: "CHECK", auth: "practice", exp: "Complaints can reveal systematic problems and are an important part of continuous improvement." },
    { q: "Traceability means being able to track raw materials back to their source.", a: true, cat: "CHECK", auth: "practice", exp: "EU regulations require food businesses to trace products one step back (supplier) and one step forward (customer)." },
    { q: "If you suspect a food product has been contaminated, you should discard it immediately and record the incident.", a: true, cat: "CHECK", auth: "practice", exp: "Suspect food must be removed from use immediately. Document what, when, why, and corrective action taken." },

    // ===================== FINNISH FOOD LEGISLATION =====================
    // LIKELY OFFICIAL
    { q: "In Finland, a Hygiene Passport is mandatory for employees who handle unpackaged perishable foods.", a: true, cat: "LAW", auth: "likely", exp: "The Finnish Food Act requires the Hygiene Passport for anyone handling unpackaged, easily perishable foods for 3+ months." },
    { q: "The Hygiene Passport must be renewed every 5 years.", a: false, cat: "LAW", auth: "likely", exp: "The Finnish Hygiene Passport is valid INDEFINITELY once obtained. It NEVER expires. Very commonly tested trick question!" },
    { q: "Food business operators are responsible for the safety of the food they produce or sell.", a: true, cat: "LAW", auth: "likely", exp: "Primary responsibility for food safety lies with the food business operator, not the authorities. Core EU principle." },
    { q: "A food business operator does not need to notify authorities before starting a food business.", a: false, cat: "LAW", auth: "likely", exp: "Notification to local food control authority is required BEFORE starting any food business or making significant changes." },
    // PRACTICE
    { q: "The Finnish Food Authority (Ruokavirasto) supervises food safety in Finland.", a: true, cat: "LAW", auth: "practice", exp: "Ruokavirasto (Finnish Food Authority) oversees food safety at the national level." },
    { q: "Municipal food control authorities carry out inspections of food premises.", a: true, cat: "LAW", auth: "practice", exp: "Local environmental health authorities carry out regular inspections under Ruokavirasto's guidance." },
    { q: "EU Regulation 852/2004 on the hygiene of foodstuffs applies in Finland.", a: true, cat: "LAW", auth: "practice", exp: "As an EU member, Finland follows EU food hygiene regulations including Regulation (EC) 852/2004." },
    { q: "Food products must be labeled with allergen information.", a: true, cat: "LAW", auth: "practice", exp: "EU regulations require 14 major allergens to be clearly indicated on food labels and for unpackaged foods." },
    { q: "A new employee must obtain a Hygiene Passport before starting work.", a: false, cat: "LAW", auth: "practice", exp: "An employee has 3 months (within first year) to obtain it. The EMPLOYER must ensure compliance." },
    { q: "The Oiva system publishes food safety inspection results for consumers.", a: true, cat: "LAW", auth: "practice", exp: "Oiva is Finland's food safety transparency system where inspection results are published with smiley ratings." },
    { q: "Food products past their 'best before' date are always illegal to sell.", a: false, cat: "LAW", auth: "practice", exp: "'Best before' = quality (can sell after if safe). 'Use by' = safety (strict deadline, cannot sell after). Critical distinction!" },
    { q: "The employer is responsible for ensuring employees obtain a Hygiene Passport.", a: true, cat: "LAW", auth: "practice", exp: "Under Finnish law, the employer must ensure all relevant employees have a valid Hygiene Passport within 3 months." },
    { q: "'Best before' and 'use by' dates mean the same thing.", a: false, cat: "LAW", auth: "practice", exp: "'Best before' = quality date (can sell after if safe). 'Use by' = safety date (strict, cannot sell after). Know the difference!" },
    { q: "The FIFO principle (First In, First Out) ensures older stock is used first.", a: true, cat: "LAW", auth: "practice", exp: "FIFO prevents waste and reduces food safety risks. New deliveries go to the back; older items stay in front." },

    // ===================== OFFICIAL RUOKAVIRASTO MODEL TEST (2025) =====================
    // The following 40 questions are from the official Ruokavirasto hygiene passport model test
    { q: "Some dairy products are made by using useful microbes.", a: true, cat: "MICRO", auth: "official", exp: "Beneficial microbes are used in many foods. Lactic acid bacteria, yeasts and molds are used to make fermented milk products, bread and mold cheeses." },
    { q: "The risk of food poisoning increases if an employee handles raw meat and vegetables using the same utensils or work surfaces.", a: true, cat: "CLEAN", auth: "official", exp: "Cross-contamination between raw meat and vegetables is a major risk. Different ingredients must be handled with different utensils and cutting boards. Hands should be washed and surfaces cleaned between handling different ingredients." },
    { q: "A refrigeration appliance's fill limit does not affect the shelf-life of foodstuffs in the appliance.", a: false, cat: "TEMP", auth: "official", exp: "Exceeding fridge capacity prevents proper air circulation, causing uneven temperatures. Some foods won't stay cold enough and spoil faster. An overfilled fridge also uses more energy." },
    { q: "The legislation on the sales and storage of foodstuffs does not have to be followed at fairs.", a: false, cat: "LAW", auth: "official", exp: "ALL operators engaged in food business must comply with food legislation, including at fairs, markets, and temporary events." },
    { q: "Washing and mechanical cleaning of work surfaces can be replaced by using only a disinfectant.", a: false, cat: "CLEAN", auth: "official", exp: "Washing removes visible dirt and organic matter that protects microbes from disinfectant. Disinfectants only work on CLEAN surfaces — washing first is essential." },
    { q: "The 'use by' date on food packaging means the date after which the foodstuff may still be sold if its quality is good.", a: false, cat: "LAW", auth: "official", exp: "'Use by' means the food may NO LONGER be sold or used after that date. It applies to microbiologically perishable foods like minced meat and fresh fish." },
    { q: "The dosing of detergent is critically important for the result of cleaning.", a: true, cat: "CLEAN", auth: "official", exp: "Too little detergent = insufficient cleaning. Too much = residue on surfaces. Follow manufacturer's dosage instructions for effective cleaning without excess residue." },
    { q: "If an employee uses disposable gloves, the gloves must always be replaced after touching dirty surfaces or handling money.", a: true, cat: "HYGIENE", auth: "official", exp: "Gloves must be changed after touching dirty surfaces, tools, money, or other contamination sources. You may NOT handle money then use the same gloves to pack food — microbes transfer through gloves." },
    { q: "Food may be safely refrigerated on a work desk if the outdoor temperature is cold enough and a window next to the food is open.", a: false, cat: "TEMP", auth: "official", exp: "This method is not sufficiently controlled. An open window lets in dust, insects and contaminants. Proper refrigeration equipment must be used. Cooling must be monitored through own-check." },
    { q: "Packaging materials of foodstuffs may not be stored directly on the floor — they must be stored on clean platforms.", a: true, cat: "CLEAN", auth: "official", exp: "Storing on clean surfaces prevents contamination of packaging materials. Dirty packaging can adversely affect the hygiene quality of foodstuffs." },
    { q: "If a foodstuff has been taken out of a freezer to thaw, its shelf-life is longer than that of a similar unfrozen foodstuff.", a: false, cat: "TEMP", auth: "official", exp: "Thawed food spoils FASTER than unfrozen food. Freezing creates ice crystals that break the food's structure, providing a better environment for rapid microbial growth after thawing." },
    { q: "Pasteurised milk is a perishable foodstuff.", a: true, cat: "MICRO", auth: "official", exp: "Although pasteurization destroys most pathogens, milk remains susceptible to spoilage if not stored at the correct temperature (max +6°C). It is still a perishable food." },
    { q: "A worker might spread noroviruses to foodstuff even if they have no symptoms.", a: true, cat: "POISON", auth: "official", exp: "Norovirus is highly contagious and can be spread by asymptomatic carriers for extended periods after symptoms stop. The virus transfers from hands to food. Good hand hygiene is critical." },
    { q: "An employee must wash their hands after handling raw foodstuffs before starting to handle cooked foodstuffs.", a: true, cat: "HYGIENE", auth: "official", exp: "Raw foodstuffs like fish or meat contain harmful bacteria that transfer to cooked foods through hands. Hand washing between handling raw and cooked food is essential to prevent cross-contamination." },
    { q: "All microbial toxins are destroyed when food is heated to over +60°C.", a: false, cat: "POISON", auth: "official", exp: "NOT all toxins are destroyed by heat. Some bacterial toxins are heat-resistant, such as enterotoxin produced by Staphylococcus aureus. Slow cooling can also cause toxin levels to increase." },
    { q: "Wounds on human skin can transfer food poisoning bacteria into foodstuffs.", a: true, cat: "HYGIENE", auth: "official", exp: "Staphylococcus aureus is commonly found in wounds. When it multiplies in food, it produces enterotoxins causing food poisoning. Wounds must be covered with a plaster plus protective gloves." },
    { q: "A rinse with water is sufficient for daily cleaning of a vegetable cutter.", a: false, cat: "CLEAN", auth: "official", exp: "Just rinsing with water is NOT enough. Food residue and microbes remain on equipment. Use detergent and a brush to effectively remove all dirt and microbes." },
    { q: "If you are selling foodstuffs from a mobile kiosk or cart, you do not need own-check activities.", a: false, cat: "CHECK", auth: "official", exp: "Mobile food premises (food vans, kiosks, carts) ARE food business operators. Own-check is mandatory for ALL food business operators without exception." },
    { q: "It is possible to get food poisoning from a ground beef patty that is cooked medium.", a: true, cat: "POISON", auth: "official", exp: "Raw meat can contain EHEC bacteria that spread throughout minced meat during grinding. If the patty is not fully cooked, bacteria survive. Internal temp must reach ≥+75°C at the thickest point." },
    { q: "Microbes can end up in foodstuffs via dirt and dust.", a: true, cat: "MICRO", auth: "official", exp: "Microbes enter food in many ways including through hands, tools, air, dirt and dust. Keeping premises clean prevents this contamination route." },
    { q: "Perishable foodstuffs can be allowed to freeze during transport.", a: false, cat: "TEMP", auth: "official", exp: "Food must be transported at correct temperatures. Freezing changes food structure, and when thawed, the broken structure provides ideal conditions for rapid microbial growth." },
    { q: "If leftover salad or casserole was offered in a buffet, the leftovers may be sold to customers the next day.", a: false, cat: "LAW", auth: "official", exp: "Perishable food may only be served ONCE. Food served at a buffet may not be sold the next day. It may only be given away if temperature was maintained (cold ≤+6°C, hot ≥+60°C)." },
    { q: "An employee might spread a contagious disease to other people via foodstuffs even without symptoms.", a: true, cat: "POISON", auth: "official", exp: "Asymptomatic carriers can spread diseases (e.g., norovirus) through food. A person who has or carries a food-transmissible disease must NOT handle food if there is a contamination risk." },
    { q: "Deep frozen fish must be thawed in a refrigerated area.", a: true, cat: "TEMP", auth: "official", exp: "Thawing must be done in a fridge or similarly cold space so the surface temperature doesn't rise above the rest of the food. Drippings must be cleaned promptly." },
    { q: "A local food control authority is responsible for the safety of the foodstuffs sold in a grocery store.", a: false, cat: "LAW", auth: "official", exp: "Food safety responsibility ALWAYS lies with the food business operator, not the authorities. The local authority's role is to SUPERVISE that operators ensure food safety." },
    { q: "If a foodstuff contains preservatives, it cannot contain bacteria that cause food poisoning.", a: false, cat: "MICRO", auth: "official", exp: "Preservatives slow or prevent bacterial growth but do NOT kill bacteria or guarantee complete protection. Improper storage conditions allow bacteria to grow despite preservatives." },
    { q: "Microbes are always present on human skin.", a: true, cat: "HYGIENE", auth: "official", exp: "Human skin always hosts microbes — bacteria, fungi and viruses. Many are beneficial, but careful and regular hand washing is essential for hygienic food handling." },
    { q: "Raw materials and products that cause allergies or contain gluten must be stored well-labeled and protected in sealed packaging.", a: true, cat: "CLEAN", auth: "official", exp: "If gluten-free flour is stored unprotected near regular flour, cross-contamination risk is high. Proper labeling and sealed packaging prevents allergen contamination." },
    { q: "Cleaning the working surfaces immediately after work reduces hygienic risks.", a: true, cat: "CLEAN", auth: "official", exp: "Immediate cleaning prevents bacteria accumulation and cross-contamination. Regular and prompt cleaning keeps the work environment safe." },
    { q: "Bacteria that spoil foodstuffs can multiply rapidly between +6°C and +60°C.", a: true, cat: "TEMP", auth: "official", exp: "The danger zone (+6 to +60°C) is where bacteria harmful to humans grow fastest. Avoid keeping food in this temperature range at every stage of processing." },
    { q: "Cleaning and sanitation equipment may be stored unprotected in the toilet next to the toilet bowl.", a: false, cat: "CLEAN", auth: "official", exp: "Toilet areas spread bacteria easily — unprotected equipment gets contaminated. Cleaning equipment must be cleaned after use and stored hygienically in a proper area." },
    { q: "Familiarisation with own-check activities is part of the induction of a new employee.", a: true, cat: "CHECK", auth: "official", exp: "Own-check training is essential during induction so new employees understand food safety practices and can follow them consistently. This ensures everyone works safely." },
    { q: "Microbes can multiply quickly in dirty tableware and cutlery.", a: true, cat: "MICRO", auth: "official", exp: "Dirty dishes provide food residue (nutrients), moisture, and warmth — ideal conditions for rapid microbial growth. Under favorable conditions, numbers increase exponentially." },
];

// ===================== EXAM TRICKS & COMMON PITFALLS =====================
const EXAM_TRICKS = [
    { title: "🏠 Professional vs Home Kitchen", tip: "ALWAYS answer from the perspective of a PROFESSIONAL kitchen. What may be acceptable at home (e.g., tasting from the pot) is NOT acceptable professionally." },
    { title: "⚠️ Absolute Words = Often FALSE", tip: "Statements with 'always', 'never', 'all', 'only', 'every' are often FALSE. Be especially careful with: 'always safe', 'kills all', 'never needed'." },
    { title: "❄️ Freezing Myth", tip: "Freezing STOPS bacterial growth but does NOT KILL bacteria. This is one of the most commonly missed questions. Bacteria resume activity upon thawing." },
    { title: "🌡️ Room Temperature Myth", tip: "Do NOT cool food to room temperature before refrigerating. This common home practice is WRONG in professional settings. Refrigerate promptly!" },
    { title: "🧤 Gloves ≠ Handwashing", tip: "Gloves are NOT a replacement for handwashing. Wash hands BEFORE gloving AND every time you change gloves." },
    { title: "📜 Passport Never Expires", tip: "The Hygiene Passport is valid INDEFINITELY. If asked whether it needs renewal (every 5 years, etc.), the answer is always FALSE." },
    { title: "🫐 Frozen Berries = Danger", tip: "Frozen berries can contain norovirus. They MUST be heated to +90°C for at least 2 minutes. This is uniquely important in Finland." },
    { title: "🦠 Listeria vs Other Bacteria", tip: "Unlike most bacteria, Listeria monocytogenes can grow at REFRIGERATOR temperatures (0°C+). This makes it especially dangerous." },
    { title: "📋 Own-Check for ALL", tip: "Own-check (self-monitoring) is mandatory for ALL food businesses regardless of size. Not just large ones." },
    { title: "📝 Blank Answers = Wrong", tip: "NEVER leave a question blank — unanswered questions count as WRONG. Always mark an answer, even if unsure." },
    { title: "✏️ Correcting Answers", tip: "If changing your answer, shade the incorrect box completely, then mark the new answer clearly with an X." },
    { title: "🍳 'Best Before' vs 'Use By'", tip: "'Best before' = quality (can still sell). 'Use by' = safety (MUST discard after). If asked if they mean the same, answer FALSE." },
    { title: "💧 S. aureus Toxin", tip: "Staphylococcus aureus toxin is HEAT-STABLE — it survives boiling. Even if you cook contaminated food thoroughly, the toxin remains dangerous." },
    { title: "🧴 Disinfection Order", tip: "Clean FIRST with detergent, THEN disinfect. Disinfection does NOT work on dirty surfaces. Order matters!" },
    { title: "🔵 Blue Bandages", tip: "Wounds must be covered with BLUE waterproof bandages (bright color = easy to find if it falls off), plus gloves on top." },
];

// ===================== FREQUENTLY REPEATED QUESTIONS =====================
const FREQUENTLY_TESTED = [
    { question: "Food should be cooled to room temperature before refrigerating.", answer: false, freq: "⭐⭐⭐⭐⭐", note: "The #1 most commonly missed question. It's a home-cooking myth — refrigerate promptly in professional settings." },
    { question: "Freezing kills all harmful bacteria.", answer: false, freq: "⭐⭐⭐⭐⭐", note: "Freezing STOPS growth only. Bacteria survive and resume activity when food thaws." },
    { question: "The Hygiene Passport must be renewed every 5 years.", answer: false, freq: "⭐⭐⭐⭐", note: "It NEVER expires. Valid indefinitely. One of the top trick questions." },
    { question: "Disposable gloves replace hand washing.", answer: false, freq: "⭐⭐⭐⭐", note: "Gloves are NOT a substitute. Wash hands before gloving and when changing gloves." },
    { question: "Deep-frozen berries might contain food poisoning microbes.", answer: true, freq: "⭐⭐⭐⭐", note: "Norovirus survives freezing. Heat to +90°C for 2 min. Finland-specific priority." },
    { question: "You can always tell contaminated food by look/smell/taste.", answer: false, freq: "⭐⭐⭐⭐", note: "Many dangerous pathogens cause ZERO detectable changes in food." },
];

const STUDY_GUIDE = [
    {
        icon: "🦠", title: "Microbiology & Contamination", facts: [
            "Microbes include bacteria, viruses, molds, yeasts, and parasites",
            "Not all microbes are harmful — many are useful (yogurt, cheese, bread)",
            "Pathogenic microbes cause illness; spoilage microbes cause food to go bad",
            "Bacteria need warmth (+6 to +60°C), moisture, nutrients, and time to grow",
            "Bacteria can double every 20 minutes under ideal conditions",
            "Cross-contamination transfers bacteria from raw to cooked/ready-to-eat food",
            "Viruses cannot multiply in food but use food as a transport vehicle",
            "Spore-forming bacteria (Clostridium, Bacillus) can survive boiling",
            "You CANNOT always tell contaminated food by look, smell, or taste",
            "Vacuum-packaged food can still contain dangerous anaerobic bacteria"
        ], keyFact: "The danger zone (+6°C to +60°C) is where bacteria multiply fastest. Keep food OUT of this range!"
    },
    {
        icon: "🤢", title: "Food Poisoning", facts: [
            "Main causes: bacteria, viruses, parasites, toxins, chemicals",
            "Campylobacter is the #1 bacterial cause in Finland (from poultry)",
            "Salmonella — destroyed by cooking above +70°C",
            "Norovirus — requires +90°C for 2+ minutes (important for frozen berries!)",
            "Listeria — can grow even at refrigerator temperatures (0-6°C)",
            "Staphylococcus aureus — produces heat-stable toxin that survives cooking",
            "Bacillus cereus — associated with improperly cooled rice",
            "Clostridium perfringens — from slowly cooled stews and meat dishes",
            "Symptoms vary: 1 hour to several weeks depending on pathogen",
            "Sick employees (vomiting/diarrhea) must NOT handle food — wait 48h after symptoms"
        ], keyFact: "Always heat frozen berries to +90°C for 2 minutes (norovirus risk). Sick workers must stay home!"
    },
    {
        icon: "🌡️", title: "Temperature Control", facts: [
            "Danger zone: +6°C to +60°C — minimize time in this range",
            "Fridge: +6°C or below for most foods",
            "Fresh fish/minced meat: 0 to +3°C (stricter than general fridge)",
            "Freezer: -18°C or below",
            "Hot food service: keep at +60°C or above",
            "Cool hot food from +60°C to +6°C within 4 hours",
            "Do NOT wait for food to reach room temperature before refrigerating!",
            "Measure temperature from the CENTER of food",
            "Poultry core temperature: must reach ≥+75°C",
            "Hot food during transport must stay at +60°C or above",
            "Thaw in fridge, under cold water, or microwave — NEVER on counter"
        ], keyFact: "Cool food rapidly: +60°C → +6°C within 4 hours. Never let food sit at room temperature!"
    },
    {
        icon: "🧼", title: "Personal Hygiene", facts: [
            "Wash hands: before work, after breaks, after toilet, after raw meat/eggs",
            "Remove rings, watches, bracelets before handling food",
            "Wear clean work clothes and head covering",
            "No smoking in food preparation areas",
            "No nail polish or artificial nails — even with gloves",
            "Cover wounds with blue waterproof bandage + gloves",
            "Use separate clean spoon for each taste — never 'double dip'",
            "Gloves do NOT replace handwashing — wash before and during glove changes",
            "Sneeze/cough into elbow, never into food or hands",
            "No pets in kitchen areas of food premises",
            "No eating in food preparation areas — use designated break room"
        ], keyFact: "Handwashing is the #1 defense against food contamination. Wash with soap for 20+ seconds!"
    },
    {
        icon: "🧹", title: "Cleaning & Sanitation", facts: [
            "Clean first with detergent, THEN disinfect — order matters!",
            "Separate cutting boards for raw meat and ready-to-eat foods (color-coded)",
            "Change dishcloths frequently — wash at +60°C",
            "Written cleaning plan is mandatory for all food premises",
            "Store raw meat BELOW ready-to-eat foods in fridge",
            "Keep cleaning chemicals completely separate from food storage",
            "Clean surfaces may still harbor invisible bacteria",
            "Pest control is mandatory for all food premises",
            "Clean equipment thoroughly between allergen-containing foods",
            "Hot water alone is NOT sufficient for cleaning — use detergent",
            "Hand sanitizer does NOT replace soap-and-water handwashing",
            "No dry sweeping during food preparation — use wet mopping"
        ], keyFact: "A surface that LOOKS clean is NOT necessarily safe. Follow the cleaning plan systematically!"
    },
    {
        icon: "📋", title: "Own-Check (Self-Monitoring)", facts: [
            "Every food business MUST have an own-check plan (Finnish law)",
            "ALL employees are responsible, not just management",
            "Monitor temperatures of fridges, freezers, and hot food regularly",
            "Keep written records of all monitoring",
            "Check deliveries: temperature, packaging, expiry dates",
            "Document corrective actions when limits are exceeded",
            "HACCP = Hazard Analysis and Critical Control Points",
            "Update the plan when products or processes change",
            "Record and investigate customer complaints",
            "Ensure traceability: trace products one step back and one forward",
            "Discard suspect food immediately and document the incident"
        ], keyFact: "Own-check is mandatory for ALL food businesses, regardless of size. Keep records!"
    },
    {
        icon: "⚖️", title: "Finnish Food Legislation", facts: [
            "Hygiene Passport required for handling unpackaged perishable food (3+ months)",
            "Hygiene Passport is valid INDEFINITELY — it never expires!",
            "Employee has 3 months to get it; employer is responsible for ensuring it",
            "Finnish Food Authority (Ruokavirasto) oversees food safety nationally",
            "Local municipal authorities carry out inspections",
            "Must notify authorities BEFORE starting a food business",
            "EU Regulation 852/2004 applies in Finland",
            "14 allergens must be declared on food labels (EU requirement)",
            "Food operator bears primary responsibility for food safety",
            "Oiva system publishes inspection results with smiley ratings",
            "'Best before' = quality date (can sell after if safe)",
            "'Use by' = safety date (strict — cannot sell after)",
            "FIFO principle: First In, First Out — use older stock first"
        ], keyFact: "The Hygiene Passport NEVER expires. The employer must ensure all staff get it within 3 months!"
    }
];
