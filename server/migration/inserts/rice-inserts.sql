INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Rice University', 'Rice', 'rice', 'Houston, TX', 'Urban', 300, 15, 9.5, 4247, 54960, 16076, 'Private', 1500, 1530, 1560, 34, 35, 36);
-- Deadline 1 for Rice University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rice University'), 'regularDecision', '2024-01-05T00:00:00.000Z', 'Regular Decision', '2024-02-02T00:00:00.000Z');
-- Deadline 2 for Rice University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rice University'), 'earlyDecision', '2024-11-05T00:00:00.000Z', 'Early Decision', '2024-11-16T00:00:00.000Z');
-- Supplemental Essay 1 for Rice University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rice University'), 'Please explain why you wish to study in the academic areas you selected above. (150 words or fewer.)', 150);
-- Supplemental Essay 2 for Rice University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rice University'), 'Based upon your exploration of Rice University, what elements of the Rice experience appeal to you? (150 words or fewer.)', 150);
-- Supplemental Essay 3 for Rice University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rice University'), 'The Rice Box: In keeping with Rice’s long-standing tradition, please share an image of something that appeals to you.(150 words or fewer)', 150);
